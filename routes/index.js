const express = require("express");
const Signature = require("../models/Signature");
const router = express.Router();

router.get("/", async (req, res) => {
	const signatures = await Signature.findAll();
	console.log(signatures);
	if (signatures) {
		res.locals.signatures = signatures;
		res.render("index", { signatures });
	}
});

router.post("/sign", async (req, res) => {
	try {
		console.log("REQUEST BODY: " + req.body);
		await Signature.create({
			name: req.body.name,
			city: req.body.city,
			state: req.body.state,
		});
		res.redirect("/");
	} catch (err) {
		console.error(err);
		res.redirect("/");
	}
});

module.exports = router;
