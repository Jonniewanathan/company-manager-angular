const request = require('supertest');
const app = require('../../server');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

describe('Auth Routes', () => {

  it('POST /api/auth/register should create a new user', async () => {
    const userData = { username: 'testuser1', password: 'password123' };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(userData.username);

    const userInDb = await User.findOne({ where: { username: userData.username } });
    expect(userInDb).not.toBeNull();
    expect(await bcrypt.compare(userData.password, userInDb.password)).toBe(true);
  });

  it('POST /api/auth/login should return a JWT token on valid credentials', async () => {
    const userData = { username: 'testuser2', password: 'password123' };

    await User.create({
      username: userData.username,
      password: await bcrypt.hash(userData.password, 10)
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send(userData)
      .expect(200);

    expect(response.body).toHaveProperty('token');

    const decoded = jwt.verify(response.body.token, 'your_jwt_secret');
    expect(decoded.username).toBe(userData.username);
  });

  it('POST /api/auth/login should return 401 on invalid credentials', async () => {
    const userData = { username: 'testuser3', password: 'password123' };
    await User.create({
      username: userData.username,
      password: await bcrypt.hash(userData.password, 10)
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: userData.username, password: 'wrongpassword' })
      .expect(401);

    expect(response.body).toHaveProperty('error', 'Invalid credentials');
  });
});
