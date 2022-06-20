import { requireMock, responseMock, userMock } from '../../shared/mockes/mockes';
import { spyOnGetUserByName,  mockUserModelSave} from '../../shared/mockes/functionMockes';
const userService = require('../user.service');

describe("Check method 'updateUserService' of userService", () => {
  test('should return correct value', async () => {
    mockUserModelSave();
    spyOnGetUserByName().mockResolvedValue(userMock);
    jest.spyOn(userService, 'updateUserService')
    const result = await userService.updateUserService(requireMock, responseMock);
    expect(result).toBeInstanceOf(Object)
  });
});


 