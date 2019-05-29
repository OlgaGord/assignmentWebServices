const router = require("express").Router();
const geo = require("../../model/ipgeolocation");
const geoController = require("../../controllers/ipgeolocation");

router.get("/", (req, res) => {
  const result = geo.getTracks();
  // res.send(result);
  return result;
});

router.get("/allTracks/", (req, res) => {
  const result = geoController.allTracks(req, res);
  return result;
});

router.get("/statistics/", (req, res) => {
  const result = geoController.summaryStatistics(req, res);
  return result;
});

router.get("/tracks/:ip", (req, res) => {
  console.log(req.params.ip);
  var ip = req.params.ip;
  const result = geoController.getTracksByIP(req, res, ip);
  return result;
});

module.exports = router;
