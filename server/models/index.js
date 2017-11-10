const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//  Models
db.User = require('./user')(sequelize, Sequelize);
db.Recipe = require('./recipe')(sequelize, Sequelize);
db.Vote = require('./vote')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);
db.Favorite = require('./favorite')(sequelize, Sequelize);

//  Associations
// User
db.User.hasMany(db.Recipe, { foreignKey: 'userId' });
db.User.hasMany(db.Vote, { foreignKey: 'userId' });
db.User.hasMany(db.Favorite, { foreignKey: 'userId' });
db.User.hasMany(db.Review, { foreignKey: 'userId' });

// Recipe
db.Recipe.belongsTo(db.User, { foreignKey: 'userId' });
db.Recipe.hasMany(db.Vote, { foreignKey: 'recipeId' });
db.Recipe.hasMany(db.Review, { foreignKey: 'recipeId' });

// Review
db.Review.belongsTo(db.User, { foreignKey: 'userId' });
db.Review.belongsTo(db.Recipe, { foreignKey: 'recipeId' });

// Vote
db.Vote.belongsTo(db.User, { foreignKey: 'userId' });
db.Vote.belongsTo(db.Recipe, { foreignKey: 'recipeId' });

// Favorite
db.Favorite.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;