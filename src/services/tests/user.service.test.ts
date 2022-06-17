import mongoose from "mongoose";
import User from "../../models/user.model";

const userService = require('../user.service');

const reqUserMockUpd = { user: { username: 'test' }, body: { user: { username: 'test2', email: 'test2@com', bio: 'bio', image: 'image' } } };

beforeAll((done) => {
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

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe("Check method 'updateUserService' ", () => {
  test('should return correct value', async () => {
    const mockUserResponse = {
      send: () => { },
      status: function (responseStatus: any) {
        return this;
      }
    };
    const result = await userService.updateUserService(reqUserMockUpd, mockUserResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

 