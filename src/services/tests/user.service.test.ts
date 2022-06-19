
import User from "../../models/user.model";
const userService = require('../user.service');
const mockingoose = require('mockingoose');
const userServiceForMock = require('../../entities/user');


const userMock = {
  username: 'test',
  email: 'test@com',
  password: 'password',
  bio: 'bio',
  image: 'image',
  favorites: [],
  following: [],
  save: () => { },
  _conditions: { username: 'test'}
};
const reqUserMockUpd = { user: { username: 'test' }, headers: { authorization: 'Bearer 111' },  body: { user: { username: 'test2', email: 'test2@com', bio: 'bio', image: 'image' } } };
const userServiceDraft = { username: 'username', email: 'test2@com', bio: 'bio', image: 'image' };
const mockUserResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
  }
};

describe("Check method 'updateUserService' ", () => {
  test('should return correct value', async () => {
    mockingoose(User).toReturn(userServiceDraft, 'save');
    const spyResult = jest.spyOn(userServiceForMock, 'getUserByName').mockResolvedValue(userMock);
    const resultSpy = jest.spyOn(userService, 'updateUserService')
    const result = await userService.updateUserService(reqUserMockUpd, mockUserResponse);
    expect(result).toBeInstanceOf(Object)
  });
});


 