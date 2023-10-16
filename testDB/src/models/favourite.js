"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Favourite extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Favourite.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
                as: "user",
            });
            Favourite.belongsTo(models.ProductSize, {
                foreignKey: "productSizeId",
                targetKey: "id",
                as: "productSize",
            });
        }
    }
    Favourite.init(
        {
            productSizeId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Favourite",
        }
    );
    return Favourite;
};
