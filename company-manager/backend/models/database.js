const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize for your database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Export the Sequelize instance
module.exports = sequelize;
