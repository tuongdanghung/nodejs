"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("ProductSizes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            colorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            capacityId: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        // await queryInterface.addConstraint("ProductSizes", {
        //     fields: ["productId"],
        //     type: "foreign key",
        //     name: "fk_products_productId",
        //     references: {
        //         table: "Products",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
        // await queryInterface.addConstraint("ProductSizes", {
        //     fields: ["capacityId"],
        //     type: "foreign key",
        //     name: "fk_products_capacityId",
        //     references: {
        //         table: "Capacities",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
        // await queryInterface.addConstraint("ProductSizes", {
        //     fields: ["colorId"],
        //     type: "foreign key",
        //     name: "fk_products_colorId",
        //     references: {
        //         table: "Colors",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("ProductSizes");
    },
};
