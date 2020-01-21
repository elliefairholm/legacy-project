const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, `./${process.env.ENVIRONMENT}.env`),
});

const app = require('./app');
const db = require('./models');

const { PORT } = process.env;


db.sequelize.sync().then(() => {
  app.listen({ port: PORT }, () => {
    console.log(`Apollo Server on http://localhost:${PORT}/graphql`); // eslint-disable-line no-console
  });
});
