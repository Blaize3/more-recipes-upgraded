module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define('Recipe', {
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        origin: {
            allowNull: true,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        ingredients: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        instructions: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.TEXT)
        },
        review: {
            allowNull: true,
            type: DataTypes.ARRAY(DataTypes.TEXT)
        },
        voteCount: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    });

    Recipe.associate = (models) => {
        Recipe.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });

        Recipe.hasMany(models.Review, {
            foreignKey: 'recipeId'
        });

        Recipe.hasMany(models.Vote, {
            foreignKey: 'recipeId'
        });
    };
    return Recipe;
};