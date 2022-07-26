const userController = require('../user.controller');
const userService = require('../../services/user.service');
const userEntity = require('../../entities/user');

import { requestMock, responseMock, userMock } from '../../shared/mockes/mockes';
import { spyOnGetUserByName } from '../../shared/mockes/functionMockes';

describe("Check method 'getUser' of UserController", () => {
  test('should return correct value', async () => {
    jest.spyOn(userEntity, 'getUserByToken').mockResolvedValue(userMock);
    const result = userController.getUser(requestMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'signUp' ", () => {
  test('should catch Error', async () => {
    jest.spyOn(userService, 'createUserService').mockRejectedValue(new Error);
    const result = userController.signUp(requestMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'updateUser' of UserController", () => {
  test('should return correct value', async () => {
    spyOnGetUserByName().mockResolvedValue(userMock);
    const result = userController.updateUser(requestMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});