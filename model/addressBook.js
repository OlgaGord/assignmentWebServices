const db = require("../config/db");

module.exports = class {
    static async getAddresses() {
        let connection = await db.getConnection();
        const rows = await connection.query("SELECT * FROM `person` JOIN `address` ON `person`.`addressID`=`address`.`addressID`");
        connection.end();
        return rows;
    }

    static async viewAddress(personId) {

        let conn = await db.getConnection();
        const rows = await conn.query(
            "SELECT * FROM `person` JOIN `address` ON `person`.`addressID`=`address`.`addressID` WHERE `personId`=?",
            [personId]
        )
        conn.end();
        return rows;

    }

    static async deleteAddress(personId) {
        let conn = await db.getConnection();
        console.log(personId);
        const rows = await conn.query(
            "SELECT `addressID` FROM `person` WHERE `personId`=?",
            [personId]
        );
        if (rows.length === 1) {
            const addressID = rows[0].addressID;
            conn.query(
                "DELETE FROM `person` WHERE `person`.`personId`=?",
                [personId]
            );
            conn.query(
                "DELETE FROM `address` WHERE `address`.`addressID`=?",
                [addressID]
            );

            conn.end();
            return { deleted: { personId: personId, addressID: addressId } };
        }
        conn.end();
        return { deleted: {} };
        // console.log[rows];
    }

    static async addAddress(p, a) {
        // console.log("j", p);
        let conn = await db.getConnection();

        const addressResult = await conn.query(
            "INSERT INTO`address`(`street`, `city`, `country`, `province`, `postal_code`, `latlng`) VALUES(?, ?, ?, ?, ?, PointFromText('POINT(" +
            a.geometry.lat +
            " " +
            a.geometry.lng +
            ")'))",
            [a.street, a.city, a.country, a.province, a.postal_code]
        );

        const addressId = addressResult.insertId;

        const addPersonResult = await conn.query(
            "INSERT INTO `person`(`first`, `last`, `phone`, `addressID`) VALUES(?, ?, ?, ?)",
            [p.first, p.last, p.phone, addressId]
        );



        const personId = addPersonResult.insertId;

        //console.log(addressResult, addPersonResult);

        conn.end();

        return { addressID: addressID, personId: personId };

    }
};
