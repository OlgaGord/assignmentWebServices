
const router = require("express").Router();
const addressBookController = require("../../controllers/addressBook");

router.get("/", (req, res) => {
	const result = addressBookController.allAddresses(req, res);
	// res.send(result);
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