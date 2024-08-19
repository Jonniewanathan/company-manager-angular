const Company = require('../../models/company');
const sequelize = require('../../models/database');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Sync the database
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection
});

describe('Company Model', () => {
  it('should create a new company', async () => {
    const company = await Company.create({
      name: 'Test Company',
      ticker: 'TST',
      exchange: 'NYSE',
      isin: 'US1234567890',
      website: 'http://testcompany.com',
    });
    expect(company.name).toBe('Test Company');
    expect(company.ticker).toBe('TST');
    expect(company.isin).toBe('US1234567890');
  });
});
