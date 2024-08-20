const request = require('supertest');
const server = require('../server');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sequelize = require("../models/database");


let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.destroy({ where: {} });

  const password = await bcrypt.hash('password1', 10);
  const user = await User.create({
    username: 'testuser',
    password: password
  });
  token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
});

afterAll(async () => {
  await User.destroy({ where: {} });
  await sequelize.close();
  await server.close();
})

module.exports = {
  getToken: () => {
    return token
  },
};
