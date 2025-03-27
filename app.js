const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("./db");
const Petition = require("./models/Signature");
const http = require("http");
const portfinder = require("portfinder");
const indexRouter = require("./routes");

const app = express();
const server = http.createServer(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
	session({
		secret: "petitions",
		resave: false,
		saveUninitialized: true,
	})
);

app.use("/", indexRouter);

sequelize.sync({ force: true }).then(async () => {
	try {
		await addDefaults();
		console.log("Defaults added.");
		await startServer();
	} catch (err) {
		console.error("Error during initialization:", err);
		process.exit(1);
	}
});

async function startServer() {
	try {
		const port = await getPort();
		app.set("port", port);

		server.listen(port);
		server.on("listening", () => {
			console.log(`Server is running at http://localhost:${port}`);
		});
	} catch (err) {
		console.error("Error starting the server:", err);
		process.exit(1);
	}
}

function getPort() {
	return new Promise((resolve, reject) => {
		portfinder.getPort((err, availablePort) => {
			if (err) {
				reject(err);
			} else {
				resolve(availablePort);
			}
		});
	});
}

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
