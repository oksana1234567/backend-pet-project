const profileService = require('../profile.service');

import { requestMock, userMock } from '../../shared/mockes/mockes';
import { spyOnGetUserByToken } from '../../shared/mockes/functionMockes';

describe("Check method 'followProfileService' of profileService", () => {
  test('should return correct value', async () => {
    spyOnGetUserByToken().mockResolvedValue(userMock);
    const result = profileService.followProfileService(requestMock, userMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'unFollowProfileService' of profileService", () => {
  test('should return correct value', async () => {
    spyOnGetUserByToken().mockResolvedValue(userMock);
     const result = profileService.unFollowProfileService(requestMock, userMock);
    expect(result.constructor.name).toBe('Promise');
  });
});




