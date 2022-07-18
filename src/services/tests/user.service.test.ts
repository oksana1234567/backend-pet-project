import { requestMock, userMock } from '../../shared/mockes/mockes';
import { spyOnGetUserByToken, mockUserModelSave } from '../../shared/mockes/functionMockes';
import { Users } from '../../shared/interfaces/user.interface';

const userService = require('../user.service');

describe("Check method 'updateUserService' of userService", () => {
  test('should return correct value', async () => {
    mockUserModelSave();
    spyOnGetUserByToken().mockResolvedValue(userMock);
    jest.spyOn(userService, 'updateUserService')
    const result = userService.updateUserService(requestMock);
    expect(result.constructor.name).toBe('Promise');
    result.then((res: Users) => {
      expect(res).toMatchObject(userMock)
    });
  });
});


 