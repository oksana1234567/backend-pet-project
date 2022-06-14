const service = require('../shared/services/checkIfFollowedAuthor.service');

describe("Check method 'checkIfFollowedAuthor' ", () => {
    test('should return correct value', () => {
        const result = service.checkIfFollowedAuthor([{ username: 'username' }], 'username');
        expect(result).toBe(true);
  });
});