import mongoose from "mongoose";
import User from "../../models/user.model";

const profileService = require('../profile.service');
const reqProfileMock = { user: { username: 'test', following: [] } };
const mockResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
  }
};

beforeEach((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    () => done());
  
  new User({
  username: 'test',
  email: 'test@com',
  password: 'password',
  bio: 'bio',
  image: 'image',
  favorites: [],
  following: []
}).save();
});

afterEach( (done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe("Check method 'followProfileService' ", () => {
  test('should return correct value', async () => {
    const result = await profileService.followProfileService(reqProfileMock, 'profileUser', mockResponse);
    expect(result).toBeInstanceOf(Object)
  });
});

describe("Check method 'unFollowProfileService' ", () => {
  test('should return correct value', async () => {
    const result = await profileService.unFollowProfileService(reqProfileMock, 'profileUser', mockResponse);
    expect(result).toBeInstanceOf(Object)
  });
});



