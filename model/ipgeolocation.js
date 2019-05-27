const db = require("../config/db");
const fetch = require("node-fetch");

module.exports = class {
    static async addTrack(req) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log("IP:");
        console.log(req.ip);
        ip = "206.167.123.9";

        const geoResult = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=c461a284199842f893dc5ec8561c9a7a&ip=" + ip);
        const geo = await geoResult.json();
        console.log(geo);
        var geoname_id = null;
        if (geo != null) {
            geoname_id = geo.geoname_id;
        }

        let conn = await db.getConnection();

        const result = await conn.query(
            "INSERT INTO track (ip, uri, geoname_id) VALUES(?, ?, ?)",
            [ip, req.originalUrl, geoname_id]
        );

        if (geoname_id != null) {
            const georesult = await conn.query(
                "INSERT INTO `ipgeolocation`(`geoname_id`, `ip`, `country_name`, `country_capital`, `state_prov`, `district`, `city`, `zipcode`, `latitude`, `longitude`, `country_flag`, `organization`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                [geoname_id, ip, geo.country_name, geo.country_capital, geo.state_prov, geo.district, geo.city, geo.zipcode, geo.latitude, geo.longitude, geo.country_flag, geo.organization]
            );
        }

        /*
       
        
        return rows;
        */
        conn.end();
    }

    static async getGeo(ip) {
        let conn = await db.getConnection();
        const rows = await conn.query(
            "SELECT * FROM ipgeolocation WHERE ip = ?"
            [ip]
        )
        conn.end();
        if (rows.count > 1) { return rows[0] }
        else { return null }
    }

    static async getTracks() {
        let conn = await db.getConnection();
        const rows = await conn.query(
            "SELECT * FROM track t left join ipgeolocation g on t.geoname_id = g.geoname_id"
        )
        conn.end();
        return rows;
    }
};