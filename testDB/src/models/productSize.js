"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ProductSize extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ProductSize.belongsTo(models.Product, {
                foreignKey: "productId",
                targetKey: "id",
                as: "product",
            });
            ProductSize.belongsTo(models.Capacity, {
                foreignKey: "capacityId",
                targetKey: "id",
                as: "capacity",
            });
            ProductSize.belongsTo(models.Color, {
                foreignKey: "colorId",
                targetKey: "id",
                as: "color",
            });
        }
    }
    ProductSize.init(
        {
            productId: DataTypes.INTEGER,
            colorId: DataTypes.INTEGER,
            capacityId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "ProductSize",
        }
    );
    return ProductSize;
};
