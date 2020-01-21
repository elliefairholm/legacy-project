jest.mock('../../../../models/index', () => ({
  Roadmaps: {
    destroy: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
  },
  Topics: {
    destroy: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    bulkCreate: jest.fn(),
  },
  ChecklistItems: {
    destroy: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  Users: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, `../../../../${process.env.ENVIRONMENT}.env`),
});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const mutations = require('../../mutations.resolvers');
const db = require('../../../../models/index.js');

// test the user signup:

test('sign a new user up', async () => {
  // Given
  const fakeUser = {
    name: 'teo',
    email: 'teo@teo.com',
    password: 'teo',
  };
  const fakeResponseUser = {
    id: 1,
    name: 'teo',
    email: 'teo@teo.com',
  };
  db.Users.create.mockResolvedValue(fakeResponseUser);

  // When
  const result = await mutations.signup(null, fakeUser);

  // Then
  expect(jwt.decode(result)).toEqual(expect.objectContaining(fakeResponseUser));
});

test('sign in when the user already exists', async () => {
  // Given
  const fakeUser = {
    name: 'teo',
    email: 'teo@teo.com',
    password: 'teo',
  };
  db.Users.findOne.mockResolvedValue(true);

  // When
  const result = await mutations.signup(null, fakeUser);

  // Then
  expect(result).toEqual('');
});

// test the user login:

test('log a user in when user not previously created', async () => {
  // Given
  const fakeUser = {
    email: 'teo@teo.com',
    password: 'teo',
  };
  db.Users.findOne.mockResolvedValue(null);

  // When
  const result = await mutations.login(null, fakeUser);

  // Then
  expect(result).toEqual('');
});

test('login a user when user exists but password is wrong', async () => {
  const wrongPasswordUser = {
    email: 'teo@teo.com',
    password: 'not teo',
  };
  const hash = await bcrypt.hash('teo', 10);
  db.Users.findOne.mockResolvedValue({ email: 'teo@teo.com', password: hash });

  // When
  const result = await mutations.login(null, wrongPasswordUser);

  // Then
  expect(result).toEqual('');
});

test('successfully login a user', async () => {
  const fakeUser = {
    email: 'teo@teo.com',
    password: 'teo',
  };
  const fakeLoggedUser = {
    id: 1,
    email: 'teo@teo.com',
    name: 'teo',
  };
  const hash = await bcrypt.hash(fakeUser.password, 10);
  db.Users.findOne.mockResolvedValue({
    email: 'teo@teo.com', password: hash, name: 'teo', id: 1,
  });

  // When
  const result = await mutations.login(null, fakeUser);

  // Then
  expect(jwt.decode(result)).toEqual(expect.objectContaining(fakeLoggedUser));
});


// create roadmap
test('create a roadmap', async () => {
  // Given
  const fakeNewRoadmap = {
    UserId: 1,
    title: 'Test',
    category: 'Music',
  };
  db.Roadmaps.create.mockResolvedValue({
    dataValues: fakeNewRoadmap,
  });

  // When
  const result = await mutations.createRoadmap(null, fakeNewRoadmap);

  // Then
  expect(result).toEqual({ ...fakeNewRoadmap, topics: [] });
});

// update roadmap:
test('update a roadmap', async () => {
  // Given
  const fakeRoadmap = {
    id: 1,
    title: 'i hate testing',
    category: 'code',
  };
  db.Roadmaps.update.mockResolvedValue([3, [{
    dataValues: fakeRoadmap,
  }]]);

  // When
  const result = await mutations.updateRoadmap(null, fakeRoadmap);

  // Then
  expect(result).toEqual({ ...fakeRoadmap });
});


test('destroy an existing roadmap', async () => {
  // Given
  const fakeRoadmap = {
    id: 1,
  };
  db.Roadmaps.destroy.mockResolvedValue(1);

  // When
  const result = await mutations.deleteRoadmap(null, fakeRoadmap);

  // Then
  expect(result).toEqual(fakeRoadmap.id);
});

test('destroy a roadmap that does not exist', async () => {
  // Given
  const fakeRoadmap = {
    id: 1,
  };
  db.Roadmaps.destroy.mockResolvedValue(null);
  // expect.assertions(1);
  try {
  // When
    await mutations.deleteRoadmap(null, fakeRoadmap);
  } catch (e) {
    // Then
    expect(e).toMatchSnapshot();
  }
});

test('create a topic where row is NOT full', async () => {
  // Given
  const fakeTopic = {
    title: 'hola',
    rowNumber: 1,
    RoadmapId: 1,
  };
  db.Topics.findAll.mockResolvedValue([]);
  db.Topics.create.mockResolvedValue({ dataValues: fakeTopic });

  // When
  const result = await mutations.createTopic(null, fakeTopic);

  // Then
  expect(result).toEqual({ ...fakeTopic, checklist: [] });
});

test('create a topic where row IS full', async () => {
  // Given
  const fakeTopic = {
    title: 'hola',
    rowNumber: 1,
    RoadmapId: 1,
  };
  db.Topics.findAll.mockResolvedValue([
    {
      title: 'test1', rowNumber: 1, RoadmapId: 1, id: 1,
    },
    {
      title: 'test2', rowNumber: 1, RoadmapId: 1, id: 2,
    },
    {
      title: 'test3', rowNumber: 1, RoadmapId: 1, id: 3,
    },
    {
      title: 'test4', rowNumber: 1, RoadmapId: 1, id: 4,
    },
    {
      title: 'test5', rowNumber: 1, RoadmapId: 1, id: 5,
    },
  ]);

  try {
    // When
    await mutations.deleteRoadmap(null, fakeTopic);
  } catch (e) {
    // Then
    expect(e).toMatchSnapshot();
  }
});

test('update Topic', async () => {
  // Given
  const fakeUpdate = {
    title: 'Update',
    id: 1,
  };
  db.Topics.update.mockResolvedValue([1, [{ dataValues: { title: 'Update', id: 1 } }]]);

  // When
  const result = await mutations.updateTopic(null, fakeUpdate);

  // Then
  expect(result).toEqual({ ...fakeUpdate });
});


test('destroy an existing topic', async () => {
  // Given
  const fakeTopic = {
    id: 1,
  };
  db.Topics.destroy.mockResolvedValue(1);

  // When
  const result = await mutations.deleteTopic(null, fakeTopic);

  // Then
  expect(result).toEqual(fakeTopic.id);
});

test('destroy a topic that does not exist', async () => {
  // Given
  const fakeTopic = {
    id: 1,
  };
  db.Topics.destroy.mockResolvedValue(null);
  // expect.assertions(1);
  try {
    // When
    await mutations.deleteTopic(null, fakeTopic);
  } catch (e) {
    // Then
    expect(e).toMatchSnapshot();
  }
});

test('successfuly create a checklist item', async () => {
  // Given
  const fakeChecklistItem = {
    title: 'hola',
    TopicId: 1,
  };
  db.ChecklistItems.create.mockResolvedValue({ dataValues: fakeChecklistItem });

  // When
  const result = await mutations.createChecklistItem(null, fakeChecklistItem);

  // Then
  expect(result).toEqual({ ...fakeChecklistItem });
});

test('unsuccessfuly create a checklist item', async () => {
  // Given
  const fakeChecklistItem = {
    title: 'hola',
    TopicId: 1,
  };
  db.ChecklistItems.create.mockResolvedValue(null);

  try {
    // When
    await mutations.createChecklistItem(null, fakeChecklistItem);
  } catch (e) {
    // Then
    expect(e).toMatchSnapshot();
  }
});


test('update Checklist Item', async () => {
  // Given
  const fakeUpdate = {
    title: 'Update',
    id: 1,
    completed: true,
  };
  db.ChecklistItems.update.mockResolvedValue([1, [{ dataValues: fakeUpdate }]]);

  // When
  const result = await mutations.updateChecklistItem(null, fakeUpdate);

  // Then
  expect(result).toEqual({ ...fakeUpdate });
});


test('destroy an existing checklist item', async () => {
  // Given
  const fakeChecklistItem = {
    id: 1,
  };
  db.ChecklistItems.destroy.mockResolvedValue(1);

  // When
  const result = await mutations.deleteChecklistItem(null, fakeChecklistItem);

  // Then
  expect(result).toEqual(fakeChecklistItem.id);
});

test('destroy a topic that does not exist', async () => {
  // Given
  const fakeChecklistItem = {
    id: 1,
  };
  db.ChecklistItems.destroy.mockResolvedValue(null);
  // expect.assertions(1);
  try {
    // When
    await mutations.deleteChecklistItem(null, fakeChecklistItem);
  } catch (e) {
    // Then
    expect(e).toMatchSnapshot();
  }
});

test('copy a roadmap', async () => {
  // Given
  const fakeRoadmap = {
    id: 1,
    title: 'I love testing',
    category: 'code',
  };
  const fakeUser = {
    user: { id: 1 },
  };
  const fakeTopics = [
    { RoadmapId: 1, id: 1 },
  ];
  db.Roadmaps.findOne.mockResolvedValue(fakeRoadmap);
  db.Topics.findAll.mockResolvedValue(fakeTopics);
  db.Roadmaps.create.mockResolvedValue({ ...fakeRoadmap, UserId: fakeUser.id });
  db.Topics.bulkCreate.mockResolvedValue(null);

  // When
  const result = await mutations.copyRoadmap(null, fakeRoadmap, fakeUser);

  // Then
  expect(result).toEqual('Success');
});
