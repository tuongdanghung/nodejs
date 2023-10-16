"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Favourites", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
            },
            productSizeId: {
                type: Sequelize.INTEGER,
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
        await queryInterface.addConstraint("Favourites", {
            fields: ["productSizeId"],
            type: "foreign key",
            name: "fk_Favourites_productSizeId",
            references: {
                table: "ProductSizes",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        await queryInterface.addConstraint("Favourites", {
            fields: ["userId"],
            type: "foreign key",
            name: "fk_Favourites_userId",
            references: {
                table: "Users",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Favourites");
    },
};
