
const profileController = require('../profile.controller');
const profileServiceForMock = require('../../services/profile.service');
const userServiceForMock = require('../../entities/user');

const reqProfileControllerMock = { params: { username: 'username' }, user: { username: 'username', following: [{ username: 'username' }] }, body: { comment: { body: 'body' } }, _conditions: { username: 'username' }, headers: { authorization: 'Bearer 111111' }, sendAsProfileResult: ()=>{} };
const mockProfileResponse = {
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


describe("Check method 'followProfile' ", () => {
  test('should return correct value', async () => {
    jest.spyOn(profileServiceForMock, 'followProfileService').mockResolvedValue(userMock)
    const spyResult = jest.spyOn(userServiceForMock, 'getUserByName').mockResolvedValue(userMock);
    const result = profileController.followProfile(reqProfileControllerMock, mockProfileResponse);
       expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(profileServiceForMock, 'followProfileService').mockResolvedValue(userMock)
    const spyResult = jest.spyOn(userServiceForMock, 'getUserByName').mockRejectedValue(new Error);
    const result = profileController.followProfile(reqProfileControllerMock, mockProfileResponse);
       expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'unFollowProfile' ", () => {
  test('should return correct value', async () => {
    jest.spyOn(profileServiceForMock, 'unFollowProfileService').mockResolvedValue(userMock);
    const spyResult = jest.spyOn(userServiceForMock, 'getUserByName').mockResolvedValue(userMock);
    const result = profileController.unFollowProfile(reqProfileControllerMock, mockProfileResponse);
       expect(result.constructor.name).toBe('Promise');
  });

    test('should return Error', async () => {
    jest.spyOn(profileServiceForMock, 'unFollowProfileService').mockResolvedValue(userMock);
    const spyResult = jest.spyOn(userServiceForMock, 'getUserByName').mockRejectedValue(new Error);
    const result = profileController.unFollowProfile(reqProfileControllerMock, mockProfileResponse);
      expect(result.constructor.name).toBe('Promise');
    });
  
});

describe("Check method 'getProfile' ", () => {
  test('should return correct value', async () => {
    jest.spyOn(profileServiceForMock, 'getProfileService').mockResolvedValue(userMock);
    jest.spyOn(userServiceForMock, 'getUserByName').mockResolvedValue(userMock);
    const result = jest.spyOn(profileController, 'getProfile');
    profileController.getProfile(reqProfileControllerMock, mockProfileResponse);
    expect(result).toHaveBeenCalledTimes(1);
  });

    test('should catch Error', async () => {
    jest.spyOn(profileServiceForMock, 'getProfileService').mockRejectedValue(new Error);
    jest.spyOn(userServiceForMock, 'getUserByName').mockResolvedValue(userMock);
    jest.spyOn(profileController, 'getProfile');
    const result = profileController.getProfile(reqProfileControllerMock, mockProfileResponse);
      expect(result).toBeFalsy();
  });
});



