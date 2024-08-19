const request = require('supertest');
const app = require('../../server');
const sequelize = require('../../models/database');
const Company = require('../../models/company');

beforeAll(async () => {
  // Sync the database before running tests
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Close the database connection after all tests are done
  await sequelize.close();
});

describe('Company Routes', () => {

  it('should create a new company', async () => {
    const response = await request(app)
      .post('/api/companies')
      .send({
        name: 'Test Company',
        ticker: 'TST',
        exchange: 'NYSE',
        isin: 'US1234567890',
        website: 'http://testcompany.com',
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Company');
    expect(response.body.ticker).toBe('TST');
    expect(response.body.isin).toBe('US1234567890');
  });

  it('should retrieve a company by ID', async () => {
    // Create a company for this test
    const company = await Company.create({
      name: 'Test Company 2',
      ticker: 'TST2',
      exchange: 'NYSE',
      isin: 'US0987654321',
    });

    const response = await request(app)
      .get(`/api/companies/${company.id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test Company 2');
    expect(response.body.isin).toBe('US0987654321');
  });

  it('should retrieve a company by isin', async () => {
    // Create a company for this test
    const company = await Company.create({
      name: 'Test Company 3',
      ticker: 'TST3',
      exchange: 'NYSE',
      isin: 'US1122334455',
    });

    const response = await request(app)
      .get(`/api/companies/isin/${company.isin}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test Company 3');
    expect(response.body.ticker).toBe('TST3');
  });

  it('should retrieve all companies', async () => {
    await Company.create({
      name: 'Test Company 4',
      ticker: 'TST4',
      exchange: 'NYSE',
      isin: 'US5566778899',
    });

    const response = await request(app)
      .get('/api/companies');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update an existing company', async () => {
    // Create a company for this test
    const company = await Company.create({
      name: 'Test Company 5',
      ticker: 'TST5',
      exchange: 'NYSE',
      isin: 'US6677889900',
    });

    const response = await request(app)
      .put(`/api/companies/${company.id}`)
      .send({ name: 'Updated Company 5' });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Company 5');
  });

});
