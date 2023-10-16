"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Products", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: { type: Sequelize.STRING },
            description: { type: Sequelize.TEXT },
            brandId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            price: { type: Sequelize.INTEGER },
            active: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
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
        // await queryInterface.addConstraint("Products", {
        //     fields: ["categoryId"],
        //     type: "foreign key",
        //     name: "fk_products_categoryId",
        //     references: {
        //         table: "Categories",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
        // await queryInterface.addConstraint("Products", {
        //     fields: ["brandId"],
        //     type: "foreign key",
        //     name: "fk_products_brandId",
        //     references: {
        //         table: "Brands",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Products");
    },
};
