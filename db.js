const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database/petitions.sqlite",
});

module.exports = sequelize;
