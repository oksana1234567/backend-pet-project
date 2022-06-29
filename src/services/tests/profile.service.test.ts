const profileService = require('../profile.service');

import { requestMock, responseMock, userMock } from '../../shared/mockes/mockes';
import { spyOnGetUserByName } from '../../shared/mockes/functionMockes';

describe("Check method 'followProfileService' of profileService", () => {
  test('should return correct value', async () => {
    const spyResult = spyOnGetUserByName().mockResolvedValue(userMock);
    await profileService.followProfileService(requestMock, userMock, responseMock);
    expect(spyResult).toHaveReturned();
  });
});

describe("Check method 'unFollowProfileService' of profileService", () => {
  test('should return correct value', async () => {
    const spyResult = spyOnGetUserByName().mockResolvedValue(userMock);
    await profileService.unFollowProfileService(requestMock, userMock, responseMock);
    expect(spyResult).toHaveReturned();
  });

  test('should catch Error', async () => {
    spyOnGetUserByName().mockRejectedValue(new Error)
    const result = await profileService.unFollowProfileService(requestMock, userMock, responseMock);
    expect(result).toBeFalsy();
  });
});




