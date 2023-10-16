const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Role, {
                foreignKey: "roleId",
                as: "role",
            });
            User.hasMany(models.Address, {
                foreignKey: "userId",
                as: "address",
            });
        }
    }

    User.init(
        {
            email: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            avatar: DataTypes.STRING,
            password: DataTypes.STRING,
            active: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    return User;
};
