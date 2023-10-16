module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Addresses", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            province: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            district: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ward: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            userId: {
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
        // await queryInterface.addConstraint("Addresses", {
        //     fields: ["userId"],
        //     type: "foreign key",
        //     name: "fk_addresses_userId",
        //     references: {
        //         table: "Users",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        // });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Addresses");
    },
};
