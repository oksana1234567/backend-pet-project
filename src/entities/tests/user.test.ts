const userEntity = require('../user');
const tokenHelper = require('../../shared/helpers/authHandler/getToken');
const mockingoose = require('mockingoose');

import User from '../../models/user.model';
import { Users } from '../../shared/interfaces/user.interface';
import { articlesMock } from '../../shared/mockes/mockes';

mockingoose(User).toReturn(articlesMock, 'findOne');

describe("Check method 'getUserByName' of userEntity", () => {
  test('should return correct value', () => {
    const result = userEntity.getUserByName('username');
    result.then((res: Users) => expect(res).toBeInstanceOf(Array));
  });
});
