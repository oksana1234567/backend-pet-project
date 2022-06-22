const findFollowedAuthorHelper = require('../filters/findFollowedAuthor');

describe("Check method 'findFollowedAuthor' ", () => {
  test('should return correct value', () => {
    const result = findFollowedAuthorHelper.findFollowedAuthor([{ username: 'username' }]);
    expect(result).toEqual(expect.arrayContaining(['username']));
  });
});