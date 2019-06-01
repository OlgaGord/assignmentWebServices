const addressBookModel = require("../model/addressBook");
const fetch = require("node-fetch");
const config = require("../config/config");

module.exports = class {
    static async allAddresses(req, res) {
        const data = await addressBookModel.getAddresses();

        return res.json(data);
    }

    static async deleteAddress(req, res, id) {
        const r = await addressBookModel.deleteAddress(id);
        // console.log(r);
        return res.json(r);
    }

    static async viewAddress(req, res, id) {
        const r = await addressBookModel.viewAddress(id);
        return res.json(r);
    }

    static async addAddress(req, res) {


        const data = req.body;

        let p = {
            first: data.first == undefined ? "" : data.first,
            last: data.last == undefined ? "" : data.last,
            phone: data.phone == undefined ? "" : data.phone,

        };
        let a = {
            street: data.street == undefined ? "" : data.street,
            city: data.city == undefined ? "" : data.city,
            province: data.province == undefined ? "" : data.province,
            country: data.country == undefined ? "" : data.country,
            postal_code: data.postal_code == undefined ? "" : data.postal_code,

        };
        // console.log(data);

        const reqURI = config.geocodeURI(
            Object.values(a)
                .join(" ")
                .trim()
        );
        const geoResult = await fetch(reqURI);
        const geoResultJson = await geoResult.json();

        if (geoResultJson.results.length > 0) {

            const result = geoResultJson.results[0];
            if (a.street === "" && result.components.road) {
                a.street = result.components.road;
            }
            if (a.city === "" && result.components.city) {
                a.city = result.components.city;
            } else if (a.city === "" && result.components.town) {
                a.city = result.components.town;
            }
            if (a.province === "" && result.components.state) {
                a.province = result.components.state;
            }
            if (a.country === "" && result.components.country) {
                a.country = result.components.country;
            }
            if (a.postal_code === "" && result.components.postcode) {
                a.postal_code = result.components.postcode;
            }
            if (result.geometry) {
                a.geometry = result.geometry;

                a.geometry.lat = parseFloat(a.geometry.lat);
                a.geometry.lng = parseFloat(a.geometry.lng);
            }

        }

        const result = await addressBookModel.addAddress(p, a);

        return res.json(result);
    }
};
