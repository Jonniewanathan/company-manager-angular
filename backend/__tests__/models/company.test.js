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
      stockTicker: 'TST',
      exchange: 'NYSE',
      ISIN: 'US1234567890',
      website: 'http://testcompany.com',
    });
    expect(company.name).toBe('Test Company');
    expect(company.stockTicker).toBe('TST');
    expect(company.ISIN).toBe('US1234567890');
  });

  // More tests...
});
