"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
            },
            paymentId: {
                type: Sequelize.INTEGER,
            },
            addressId: {
                type: Sequelize.INTEGER,
            },
            orderItemId: {
                type: Sequelize.INTEGER,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "pending",
            },
            createdAt: {
                allowNull: false,
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                allowNull: false,
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
        // Thêm sợi dây liên kết
        // await queryInterface.addConstraint("Orders", {
        //     fields: ["userId"],
        //     type: "foreign key",
        //     name: "fk_Orders_userId",
        //     references: {
        //         table: "Users",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
        // await queryInterface.addConstraint("Orders", {
        //     fields: ["addressId"],
        //     type: "foreign key",
        //     name: "fk_Orders_addressId",
        //     references: {
        //         table: "Addresses",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
        // await queryInterface.addConstraint("Orders", {
        //     fields: ["paymentId"],
        //     type: "foreign key",
        //     name: "fk_Orders_paymentId",
        //     references: {
        //         table: "Payments",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Orders");
    },
};
