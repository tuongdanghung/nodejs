"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Images", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            src: {
                type: Sequelize.STRING,
            },
            productId: {
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
        // await queryInterface.addConstraint("Images", {
        //     fields: ["productId"],
        //     type: "foreign key",
        //     name: "fk_images_imageId",
        //     references: {
        //         table: "Products",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Images");
    },
};
