const userController = require('../user.controller');
const userService = require('../../services/user.service')
import { requireMock, responseMock, userMock } from '../../shared/mockes/mockes';
import { spyOnGetUserByName } from '../../shared/mockes/functionMockes';

describe("Check method 'getUser' of UserController", () => {
  test('should return correct value', async () => {
    spyOnGetUserByName().mockResolvedValue(userMock);
    const result = userController.getUser(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'signUp' ", () => {
  test('should catch Error', async () => {
    const spyResult = jest.spyOn(userService, 'createUserService').mockRejectedValue(new Error);
    const result = userController.signUp(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'updateUser' of UserController", () => {
  test('should return correct value', async () => {
    spyOnGetUserByName().mockResolvedValue(userMock);
    const result = userController.updateUser(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});