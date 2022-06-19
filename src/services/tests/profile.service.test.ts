const profileService = require('../profile.service');
const userServiceForMockForProfile = require('../../entities/user');
const reqProfileMock = { user: { username: 'test' } };

const userMockForProfile = {
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
const mockResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
  }
};

describe("Check method 'followProfileService' ", () => {
  test('should return correct value', async () => {
    const spyResult = jest.spyOn(userServiceForMockForProfile, 'getUserByName').mockResolvedValue(userMockForProfile);
    await profileService.followProfileService(reqProfileMock, userMockForProfile, mockResponse);
    expect(spyResult).toHaveReturned();
  });

  test('should catch Error', async () => {
    jest.spyOn(userServiceForMockForProfile, 'getUserByName').mockRejectedValue(new Error)
    const result = await profileService.followProfileService(reqProfileMock, userMockForProfile, mockResponse);
    expect(result).toBeFalsy();
  });
});

describe("Check method 'unFollowProfileService' ", () => {
  test('should return correct value', async () => {
    const spyResult = jest.spyOn(userServiceForMockForProfile, 'getUserByName').mockResolvedValue(userMockForProfile);
    await profileService.unFollowProfileService(reqProfileMock, userMockForProfile, mockResponse);
    expect(spyResult).toHaveReturned();
  });

  test('should catch Error', async () => {
    jest.spyOn(userServiceForMockForProfile, 'getUserByName').mockRejectedValue(new Error)
    const result = await profileService.unFollowProfileService(reqProfileMock, userMockForProfile, mockResponse);
    expect(result).toBeFalsy();
  });
});




