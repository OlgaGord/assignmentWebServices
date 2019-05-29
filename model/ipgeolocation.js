const db = require("../config/db");
const fetch = require("node-fetch");
module.exports = class {
    static async addTrack(req) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        ip = "206.167.12.9";

        let conn = await db.getConnection();

        const result = await conn.query(
            "INSERT INTO track (ip, uri) VALUES(?, ?)",
            [ip, req.originalUrl]
        );

        const rows = await conn.query(
            "SELECT * FROM ipgeolocation WHERE ip = ?",
            [ip]
        );
        if (rows.length == 0) {
            const geoResult = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=c461a284199842f893dc5ec8561c9a7a&ip=" + ip);
            const geo = await geoResult.json();

            const georesult = await conn.query(
                "INSERT INTO `ipgeolocation`(`geoname_id`, `ip`, `country_name`, `country_capital`, `state_prov`, `district`, `city`, `zipcode`, `latitude`, `longitude`, `country_flag`, `organization`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                [geo.geoname_id, ip, geo.country_name, geo.country_capital, geo.state_prov, geo.district, geo.city, geo.zipcode, geo.latitude, geo.longitude, geo.country_flag, geo.organization]
            );
        }

        conn.end();
    }
    static async getTracks(req, res) {
        let conn = await db.getConnection();
        const rows = await conn.query(
            "SELECT * FROM track t left join ipgeolocation g on t.ip = g.ip"
        )
        conn.end();
        return rows;
    }

    static async getTracksByIP(req, res, ip) {
        let conn = await db.getConnection();
        const rows = await conn.query(
            "SELECT * FROM track t left join ipgeolocation g on t.ip = g.ip WHERE t.ip like ?",
            [ip + '%']
        )
        conn.end();
        return rows;
    }
};