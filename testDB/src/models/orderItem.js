"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            OrderItem.belongsTo(models.ProductSize, {
                foreignKey: "productSizeId",
                as: "productSize",
            });
            OrderItem.belongsTo(models.Order, {
                foreignKey: "codeOrder",
                targetKey: "orderItemId",
                as: "order",
            });
        }
    }
    OrderItem.init(
        {
            productSizeId: DataTypes.INTEGER,
            codeOrder: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "OrderItem",
        }
    );
    return OrderItem;
};
