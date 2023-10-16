"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Order.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });
            Order.belongsTo(models.Address, {
                foreignKey: "addressId",
                as: "address",
            });
            Order.belongsTo(models.Payment, {
                foreignKey: "paymentId",
                as: "payment",
            });
            Order.hasMany(models.OrderItem, {
                foreignKey: "codeOrder",
                as: "sp",
                sourceKey: "orderItemId",
            });
        }
    }
    Order.init(
        {
            paymentId: DataTypes.INTEGER,
            addressId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            orderItemId: DataTypes.INTEGER,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
