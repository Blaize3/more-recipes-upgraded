module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        firstname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        sex: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Recipe, {
            foreignKey: 'userId'
        });

        User.hasMany(models.Review, {
            foreignKey: 'userId'
        });

        User.hasMany(models.Favorite, {
            foreignKey: 'userId'
        });

        User.hasMany(models.Vote, {
            foreignKey: 'userId'
        });
    };
    return User;
};