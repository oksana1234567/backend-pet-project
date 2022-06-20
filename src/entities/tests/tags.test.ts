const tagsEntity = require('../tags');

describe("Check method 'getTagsDB' of tagsEntity", () => {
  test('should return correct value', () => {
    const result = tagsEntity.getTagsDB();
    result.then((res: Object) => expect(res).toBeInstanceOf(Object));
  });
});