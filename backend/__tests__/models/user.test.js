const sequelize = require('../../models/database');
const User = require('../../models/user');

describe('User Model', () => {
  it('should create a user with valid data', async () => {
    const userData = { username: 'testUserCreation', password: 'password123' };
    const user = await User.create(userData);

    expect(user).toHaveProperty('id');
    expect(user.username).toBe('testUserCreation');
    expect(user.password).toBe('password123');
  });

  it('should not create a user with a duplicate username', async () => {
    const userData = { username: 'duplicateuser', password: 'password123' };
    await User.create(userData);

    await expect(User.create(userData)).rejects.toThrow();
  });

  it('should not create a user with a null username', async () => {
    const userData = { username: null, password: 'password123' };

    await expect(User.create(userData)).rejects.toThrow();
  });

  it('should not create a user with a null password', async () => {
    const userData = { username: 'testuser', password: null };

    await expect(User.create(userData)).rejects.toThrow();
  });
});

