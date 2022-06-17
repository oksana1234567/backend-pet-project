import mongoose from "mongoose";

const profileController = require('../profile.controller');

const reqProfileControllerMock = { params: { username: 'username' }, user: { username: 'username', following: [{ username: 'username' }] }, body: { comment: { body: 'body' } }, _conditions: { username: 'username' }, headers: { authorization: 'Bearer 111111' } };
const mockProfileResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
  }
};

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    () => done());
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe("Check method 'followProfile' ", () => {
  test('should return correct value', async () => {
    const result = profileController.followProfile(reqProfileControllerMock, mockProfileResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'unFollowProfile' ", () => {
  test('should return correct value', async () => {
    const result = profileController.unFollowProfile(reqProfileControllerMock, mockProfileResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

// describe("Check method 'getProfile' ", () => {
//   test('should return correct value', async () => {
//     const result = profileController.getProfile(reqProfileControllerMock, mockProfileResponse);
//     expect(result).toBeInstanceOf(Object);
//   });
// });



