
const router = require("express").Router();
const geo = require("../../model/ipgeolocation");
const addressBookController = require("../../controllers/addressBook");

router.get("/", (req, res) => {
	const result = addressBookController.allAddresses(req, res);
	// res.send(result);
	return result;
});

router.get("/allTracks/", (req, res) => {
	const result = geo.getTracks(req, res);
	return result;
});

router.get("/ipgeolocation/:ip", (req, res) => {
	console.log(req);
	const ip = req.params.ip;
	const result = geo.getGeo(req, res, ip);
	return result;
});

router.get("/deleteAddress/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const result = addressBookController.deleteAddress(req, res, id);

	return result;
});

router.get("/viewAddress/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const result = addressBookController.viewAddress(req, res, id);

	return result;
});

router.post("/addAddress/", (req, res) => {
	const result = addressBookController.addAddress(req, res);
	return result;

})

module.exports = router;