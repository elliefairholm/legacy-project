const path = require('path');
const { createApolloFetch } = require('apollo-fetch');
const jwt = require('jsonwebtoken');

require('dotenv').config({
  path: path.resolve(__dirname, `../../../../${process.env.ENVIRONMENT}.env`),
});

const db = require('../../../../models/index.js');

beforeAll(async () => {
  await db.sequelize.sync({ force: true, logging: false });
});

const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

test('sign up a new user', async () => {
  const result = await fetch({
    query: `mutation signup( $name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password)
      }`,
    variables: {
      name: 'teo',
      email: 'teo@teo.com',
      password: 'teo',
    },
  });
  expect(jwt.decode(result.data.signup)).toEqual(expect.objectContaining({ name: 'teo', email: 'teo@teo.com' }));
});

test.only('create a roadmap', async () => {
  const token = await fetch({
    query: `mutation signup ($name: String!, $email: String!, $password: String!) {
      signup(name: $name, email: $email, password: $password)
    }`,
    variables: {
      name: 'teo',
      email: 'teo@teo.com',
      password: 'teo',
    },
  });

  fetch.use(({ req, options }, next) => {
    options.headers = {
      authorization: `Bearer ${token.data.signup}`,
    };
    next();
  });

  const result = await fetch({
    query: `mutation createRoadmap( $UserId: ID!, $title: String!, $category: String!) {
        createRoadmap(UserId: $UserId, title: $title, category: $category) {
          title
          UserId
          category
          topics {
            title
          }
          id
        }
      }`,
    variables: {
      UserId: 1,
      title: 'testing is boring',
      category: 'code',
    },
  });
  expect(result.data.createRoadmap).toEqual({
    UserId: '1', title: 'testing is boring', category: 'code', topics: [], id: '1',
  });
});

afterAll(async () => {
  await db.sequelize.drop();
  await db.sequelize.close();
});
