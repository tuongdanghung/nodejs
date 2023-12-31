"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Address.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
                as: "user",
            });
        }
    }
    Address.init(
        {
            province: DataTypes.STRING,
            district: DataTypes.STRING,
            ward: DataTypes.STRING,
            phone: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Address",
        }
    );
    return Address;
};
