"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.belongsTo(models.Category, {
                foreignKey: "categoryId",
                targetKey: "id",
                as: "category",
            });
            Product.belongsTo(models.Brand, {
                foreignKey: "brandId",
                targetKey: "id",
                as: "brand",
            });
            Product.hasMany(models.ProductSize, {
                foreignKey: "productId",
                as: "productSize",
            });
            Product.hasMany(models.Image, {
                foreignKey: "productId",
                as: "image",
            });
        }
    }
    Product.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            brandId: DataTypes.INTEGER,
            categoryId: DataTypes.INTEGER,
            price: DataTypes.INTEGER,
            stock: DataTypes.INTEGER,
            active: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
