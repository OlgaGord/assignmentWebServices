const db = require("../config/db");
const fetch = require("node-fetch");
module.exports = class {
  static async addTrack(req) {
    var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (ip == "::1") ip = "76.16.12.9";
    console.log(ip);

    let conn = await db.getConnection();

    const result = await conn.query(
      "INSERT INTO track (ip, uri) VALUES(?, ?)",
      [ip, req.originalUrl]
    );

    const rows = await conn.query("SELECT * FROM ipgeolocation WHERE ip = ?", [
      ip
    ]);
    if (rows.length == 0) {
      const geoResult = await fetch(
        "https://api.ipgeolocation.io/ipgeo?apiKey=c461a284199842f893dc5ec8561c9a7a&ip=" +
          ip
      );
      const geo = await geoResult.json();

      const georesult = await conn.query(
        "INSERT INTO `ipgeolocation`(`geoname_id`, `ip`, `country_name`, `country_capital`, `state_prov`, `district`, `city`, `zipcode`, `latitude`, `longitude`, `country_flag`, `organization`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          geo.geoname_id,
          ip,
          geo.country_name,
          geo.country_capital,
          geo.state_prov,
          geo.district,
          geo.city,
          geo.zipcode,
          geo.latitude,
          geo.longitude,
          geo.country_flag,
          geo.organization
        ]
      );
    }
    conn.end();
  }

  static async summaryStatistics() {
    let conn = await db.getConnection();
    let cmd =
      "SELECT t.visits, t.occurred, g.* FROM (SELECT  MAX(ip) AS ip, COUNT(1) AS visits, MAX(occurred) as occurred FROM track GROUP BY ip ORDER BY track_id DESC) t INNER JOIN ipgeolocation g ON t.ip = g.ip ORDER BY occurred DESC";
    const rows = await conn.query(cmd);
    conn.end();
    return rows;
  }

  static async getTracksByIP(req, res, ip) {
    let conn = await db.getConnection();
    const rows = await conn.query(
      //    SELECT * FROM(select  max(ip) as ip, COUNT(1) from track group by ip) t INNER JOIN ipgeolocation g ON t.ip = g.ip
      "SELECT * FROM track t left join ipgeolocation g on t.ip = g.ip WHERE t.ip like ?",
      [ip + "%"]
    );
    conn.end();
    return rows;
  }

  static async getWeather(lat, lon) {
    var uri = `http://api.apixu.com/v1/current.json?q=${lat},${lon}&key=907b13a03758480191c144019193005`;
    console.log(uri);
    const result = await fetch(uri);
    return await result.json();
  }
};
