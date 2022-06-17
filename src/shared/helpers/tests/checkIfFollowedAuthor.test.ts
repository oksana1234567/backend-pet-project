const ifFollowedAuthorHelper = require('../filters/checkIfFollowedAuthor');

describe("Check method 'checkIfFollowedAuthor' ", () => {
    test('should return correct value', () => {
        const result = ifFollowedAuthorHelper.checkIfFollowedAuthor([{ username: 'username' }], 'username');
        expect(result).toBe(true);
  });
});