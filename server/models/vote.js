
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    recipeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    hasVoted: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Vote.associate = (models) => {
    Vote.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Vote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Vote;
};
