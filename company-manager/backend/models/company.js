const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stockTicker: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exchange: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ISIN: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[A-Z]{2}[A-Z0-9]{10}$/,
    },
  },
  website: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Company;
