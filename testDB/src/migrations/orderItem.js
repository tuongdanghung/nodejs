module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("OrderItems", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            productSizeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            codeOrder: {
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
        // Thêm sợi dây liên kết
        // await queryInterface.addConstraint("OrderItems", {
        //     fields: ["productSizeId"],
        //     type: "foreign key",
        //     name: "fk_OrderItems_productSizeId",
        //     references: {
        //         table: "productSizes",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
        // await queryInterface.addConstraint("OrderItems", {
        //     fields: ["userId"],
        //     type: "foreign key",
        //     name: "fk_OrderItems_userId",
        //     references: {
        //         table: "Users",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
        // await queryInterface.addConstraint("OrderItems", {
        //     fields: ["addressId"],
        //     type: "foreign key",
        //     name: "fk_OrderItems_addressId",
        //     references: {
        //         table: "Addresses",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
        // await queryInterface.addConstraint("OrderItems", {
        //     fields: ["paymentId"],
        //     type: "foreign key",
        //     name: "fk_OrderItems_paymentId",
        //     references: {
        //         table: "Payments",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("OrderItems");
    },
};
