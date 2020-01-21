const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, `../../../../${process.env.ENVIRONMENT}.env`),
});

const mutations = require('../../mutations.resolvers');
const db = require('../../../../models/index.js');


beforeAll(async () => {
  await db.sequelize.sync({ force: true, logging: false });

  const signupUserTestInput = {
    name: 'ellie',
    email: 'ellie@ellie.com',
    password: 'ellie',
  };

  const signupUserTestInput2 = {
    name: 'teo',
    email: 'teo@teo.com',
    password: 'teo',
  };
  await mutations.signup(null, signupUserTestInput);
  await mutations.signup(null, signupUserTestInput2);
});

// returns emtpy string if user already exists

const signupUserTestInput = {
  name: 'ellie',
  email: 'ellie@ellie.com',
  password: 'ellie',
};

test('returns emtpy string if user already exists', async () => {
  const result = await mutations.signup(null, signupUserTestInput);
  expect(result).toBe('');
});

// test login
test('returns emtpy string if email does not exist', async () => {
  const result = await mutations.login(null, { email: 'auhudisaudh@gmail.com', password: '' });
  expect(result).toBe('');
});

test('returns emtpy string if password does not match', async () => {
  const result = await mutations.login(null, { email: 'ellie@ellie.com', password: 'sdasdasda' });
  expect(result).toBe('');
});

// create roadmap

const createRoadmapTestInput = {
  title: 'Guitar',
  category: 'Music',
  UserId: 1,
};

const createRoadmapTestOutput = {
  title: 'Guitar',
  category: 'Music',
  UserId: 1,
  topics: [],
  id: 1,
};

test('Creates appropriate roadmap', async () => {
  const result = await mutations.createRoadmap(null, createRoadmapTestInput);
  expect(result).toEqual(expect.objectContaining(createRoadmapTestOutput));
});


// update roadmap:

const updateRoadmapTestInput = {
  title: 'Piano',
  category: 'Music',
  id: 1,
};
const updateRoadmapTestOutput = {
  title: 'Piano',
  category: 'Music',
  id: 1,
};

test('updates the appropriate roadmap', async () => {
  const result = await mutations.updateRoadmap(null, updateRoadmapTestInput);
  expect(result).toEqual(expect.objectContaining(updateRoadmapTestOutput));
});


// test('if no roadmap gives an error', async () => {
//   expect(await mutations.deleteRoadmap(null, { id: 2 })).toThrowError('does');
// });     ?????????????

// create roadmap

const createTopicTestInput = {
  title: 'Learn chords',
  rowNumber: 1,
  RoadmapId: 1,
};

const createTopicTestOutput = {
  title: 'Learn chords',
  rowNumber: 1,
  RoadmapId: 1,
  checklist: [],
};
test('Creates appropriate topic', async () => {
  const result = await mutations.createTopic(null, createTopicTestInput);
  expect(result).toEqual(expect.objectContaining(createTopicTestOutput));
});


// update topic:

const updateTopicTestInput = {
  title: 'Piano',
  description: 'i am updating',
  rowNumber: 1,
  id: 1,
};
const updateTopicTestOutput = {
  title: 'Piano',
  rowNumber: 1,
  description: 'i am updating',
  id: 1,
};

test('updates the appropriate topic', async () => {
  const result = await mutations.updateTopic(null, updateTopicTestInput);
  expect(result).toEqual(expect.objectContaining(updateTopicTestOutput));
});


// checklist tests

const createChecklistTestInput = {
  TopicId: 1,
  title: 'Checklist test',
};

const createChecklistTestOutput = {
  title: 'Checklist test',
  TopicId: 1,
  id: 1,
  completed: false,
};

test('Creates appropriate checklist', async () => {
  const result = await mutations.createChecklistItem(null, createChecklistTestInput);
  expect(result).toEqual(expect.objectContaining(createChecklistTestOutput));
});

// update checklist:

const updateChecklistTestInput = {
  title: 'Checklist test update',
  id: 1,
  completed: true,
};

const updateChecklistTestOutput = {
  title: 'Checklist test update',
  id: 1,
  TopicId: 1,
  completed: true,
};

test('updates the appropriate checklist item', async () => {
  const result = await mutations.updateChecklistItem(null, updateChecklistTestInput);
  expect(result).toEqual(expect.objectContaining(updateChecklistTestOutput));
});

test('deletes the appropriate checklist item', async () => {
  const result = await mutations.deleteChecklistItem(null, { id: 1 });
  expect(result).toBe(1);
});


// delete topic

test('deletes the appropriate topic', async () => {
  const result = await mutations.deleteTopic(null, { id: 1 });
  expect(result).toBe(1);
});

// copy roadmap test

test('copies a roadmap from one user to another', async () => {
  const result = await mutations.copyRoadmap(null, { id: 1 }, {
    user: {
      name: 'ellie',
      email: 'ellie@ellie.com',
      id: 1,
    },
  });
  expect(result).toBe('Success');
});


// delete roadmap test

test('deletes the appropriate roadmap', async () => {
  const result = await mutations.deleteRoadmap(null, { id: 1 });
  expect(result).toBe(1);
});

afterAll(async () => {
  await db.sequelize.drop();
  await db.sequelize.close();
});
