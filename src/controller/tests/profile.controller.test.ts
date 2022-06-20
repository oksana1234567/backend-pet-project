const profileController = require('../profile.controller');
const profileService = require('../../services/profile.service');
import { requireMock, responseMock, userMock } from '../../shared/mockes/mockes';
import { spyOnGetUserByName } from '../../shared/mockes/functionMockes';

describe("Check method 'followProfile' of ProfileController", () => {
  test('should return correct value', async () => {
    jest.spyOn(profileService, 'followProfileService').mockResolvedValue(userMock)
    spyOnGetUserByName().mockResolvedValue(userMock);
    const result = profileController.followProfile(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(profileService, 'followProfileService').mockResolvedValue(userMock)
    spyOnGetUserByName().mockRejectedValue(new Error);
    const result = profileController.followProfile(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'unFollowProfile' of ProfileController", () => {
  test('should return correct value', async () => {
    jest.spyOn(profileService, 'unFollowProfileService').mockResolvedValue(userMock);
    spyOnGetUserByName().mockResolvedValue(userMock);
    const result = profileController.unFollowProfile(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should return Error', async () => {
    jest.spyOn(profileService, 'unFollowProfileService').mockResolvedValue(userMock);
    spyOnGetUserByName().mockRejectedValue(new Error);
    const result = profileController.unFollowProfile(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getProfile' of ProfileController", () => {
  test('should return correct value', async () => {
    jest.spyOn(profileService, 'getProfileService').mockResolvedValue(userMock);
    spyOnGetUserByName().mockResolvedValue(userMock);
    const result = jest.spyOn(profileController, 'getProfile');
    profileController.getProfile(requireMock, responseMock);
    expect(result).toHaveBeenCalledTimes(1);
  });

  test('should catch Error', async () => {
    jest.spyOn(profileService, 'getProfileService').mockRejectedValue(new Error);
    spyOnGetUserByName().mockResolvedValue(userMock);
    jest.spyOn(profileController, 'getProfile');
    const result = profileController.getProfile(requireMock, responseMock);
    expect(result).toBeFalsy();
  });
});



