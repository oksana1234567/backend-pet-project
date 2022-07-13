const profileService = require('../profile.service');

import { requestMock, userMock } from '../../shared/mockes/mockes';
import { spyOnGetUserByName } from '../../shared/mockes/functionMockes';

describe("Check method 'followProfileService' of profileService", () => {
  test('should return correct value', async () => {
    const spyResult = spyOnGetUserByName().mockResolvedValue(userMock);
    await profileService.followProfileService(requestMock, userMock);
    expect(spyResult).toHaveReturned();
  });
});

describe("Check method 'unFollowProfileService' of profileService", () => {
  test('should return correct value', async () => {
    const spyResult = spyOnGetUserByName().mockResolvedValue(userMock);
    await profileService.unFollowProfileService(requestMock, userMock);
    expect(spyResult).toHaveReturned();
  });
});




