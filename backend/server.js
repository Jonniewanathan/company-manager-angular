const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const companyRoutes = require('./routes/routes');
const sequelize = require('./models/database');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.use('/api/companies', companyRoutes);

module.exports = app;

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


