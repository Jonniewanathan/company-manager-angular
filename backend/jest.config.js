module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  setupFilesAfterEnv: ["./__tests__/setup.js"],
  testMatch: ['**/__tests__/**/*.test.js']
};
