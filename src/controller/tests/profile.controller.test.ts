const profileController = require('../profile.controller');
const profileService = require('../../services/profile.service');
const userEntity = require('../../entities/user');

import { requestMock, responseMock, userMock } from '../../shared/mockes/mockes';
import { spyOnGetUserByName } from '../../shared/mockes/functionMockes';

describe("Check method 'followProfile' of ProfileController", () => {
  test('should return correct value', async () => {
    jest.spyOn(profileService, 'followProfileService').mockResolvedValue(userMock)
    spyOnGetUserByName().mockResolvedValue(userMock);
    const result = profileController.followProfile(requestMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(profileService, 'followProfileService').mockResolvedValue(userMock)
    spyOnGetUserByName().mockRejectedValue(new Error);
    const result = profileController.followProfile(requestMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'unFollowProfile' of ProfileController", () => {
  test('should return correct value', async () => {
    jest.spyOn(profileService, 'unFollowProfileService').mockResolvedValue(userMock);
    spyOnGetUserByName().mockResolvedValue(userMock);
    const result = profileController.unFollowProfile(requestMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should return Error', async () => {
    jest.spyOn(profileService, 'unFollowProfileService').mockResolvedValue(userMock);
    spyOnGetUserByName().mockRejectedValue(new Error);
    const result = profileController.unFollowProfile(requestMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getProfile' of ProfileController", () => {
  test('should return correct value', async () => {
    jest.spyOn(userEntity, 'getUserByToken').mockResolvedValue(userMock);
    jest.spyOn(userEntity, 'getUserByName').mockResolvedValue(userMock);
    spyOnGetUserByName().mockResolvedValue(userMock);
    const result = jest.spyOn(profileController, 'getProfile');
    profileController.getProfile(requestMock, responseMock);
    expect(result).toHaveBeenCalledTimes(1);
  });
});



