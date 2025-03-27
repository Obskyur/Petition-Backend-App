const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Signature extends Model {
	static async findSig(id) {
		try {
			return await Signature.findByPk(id);
		} catch (err) {
			console.log(err);
			return null;
		}
	}
}

Signature.init(
	{
		name: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		state: {
			type: DataTypes.STRING,
			length: 2,
			allowNull: false,
		},
	},
	{ sequelize, modelName: "Signature" }
);

module.exports = Signature;
