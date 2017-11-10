module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      origin: {
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      ingredients: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
        DefaultValue: null
      },
      instructions: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.TEXT),
        DefaultValue: null
      },

      review: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.TEXT),
        DefaultValue: null
      },
      voteCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Recipes');
  }
};
