const express = require("express");
const session = require("express-session");
const path = require("path");
const sequelize = require("./db");
const Petition = require("./models/Signature");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
	session({
		secret: "petitions",
		resave: false,
		saveUninitialized: true,
	})
);

sequelize.sync({ force: true }).then(() => {
	addDefaults().then(() => console.log("Defaults added."));
});

async function addDefaults() {
	await Petition.create({
		name: "Alice Johnson",
		city: "Seattle",
		state: "WA",
	});
	await Petition.create({
		name: "Bob Smith",
		city: "Portland",
		state: "OR",
	});
}
