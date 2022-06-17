const tagsEntities = require('../tags');

describe("Check method 'getTagsDB' ", () => {
  test('should return correct value', () => {
    const result = tagsEntities.getTagsDB();
      expect(result).toBeInstanceOf(Object);
  });
});