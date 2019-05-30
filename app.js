const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const debug = require("debug")("express:server");
const bodyParser = require("body-parser");
const app = express();
const dbLayer = require("./config/db");
const cors = require("cors");


const addressBookRouter = require("./routes/api/addressBook");
const ipgeolocationRouter = require("./routes/api/ipgeolocation");
const geo = require("./model/ipgeolocation");

const port = 9000;
app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use((req, res, next) => {

	//console.log(ip);
	geo.addTrack(req);

	next();
});
app.use("/api/addressBook", addressBookRouter);
app.use("/api/ipgeolocation", ipgeolocationRouter);

app.use("/", express.static(path.join(__dirname, "sampleclient")));

app.listen(port, function () {
	dbLayer.init();
	debug("WebAPI App " + port + "!");
});
