const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ticker: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exchange: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[A-Z]{2}[A-Z0-9]{10}$/,
    },
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Company;
