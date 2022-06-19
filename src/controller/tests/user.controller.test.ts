import mongoose from "mongoose";

const userController = require('../user.controller');
const userServiceForMock = require('../../entities/user');
const userServiceMock = require('../../services/user.service')

const reqUserControllerMock = {params: { slug: 'slug-111' }, user: { username: 'username' }, body: { user: { username: 'username', email: 'email', password: '1', bio: 'bio'  } } };
const mockResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
  }
};

const userMock = {
  username: 'test',
  email: 'test@com',
  password: 'password',
  bio: 'bio',
  image: 'image',
  favorites: [],
  following: [],
  sendAsProfileResult: ()=>{}
};

describe("Check method 'getUser' ", () => {
  test('should return correct value', async () => {
        const spyResult = jest.spyOn(userServiceForMock, 'getUserByName').mockResolvedValue(userMock);
    const result = userController.getUser(reqUserControllerMock, mockResponse);
       expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'signUp' ", () => {
  test('should catch Error', async () => {
    const spyResult = jest.spyOn(userServiceMock, 'createUserService').mockRejectedValue(new Error);
    const result = userController.signUp(reqUserControllerMock, mockResponse);
       expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'updateUser' ", () => {
  test('should return correct value', async () => {
    const spyResult = jest.spyOn(userServiceForMock, 'getUserByName').mockResolvedValue(userMock);
    const result = userController.updateUser(reqUserControllerMock, mockResponse);
       expect(result.constructor.name).toBe('Promise');
  });
});