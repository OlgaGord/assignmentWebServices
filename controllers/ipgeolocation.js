const geoModel = require("../model/ipgeolocation");
const fetch = require("node-fetch");
//const config = require("../config/config");

module.exports = class {
  static async allTracks(req, res) {
    const data = await geoModel.getTracks();

    return res.json(data);
  }

  static async summaryStatistics(req, res) {
    const data = await geoModel.summaryStatistics();
    return res.json(data);
  }

  static async getWeather(req, res) {
    console.log(req.query);
    const data = await geoModel.getWeather(req.query.lat, req.query.lon);
    return res.json(data);
  }

  static async getTracksByIP(req, res, ip) {
    const data = await geoModel.getTracksByIP(req, res, ip);

    return res.json(data);
  }
};
