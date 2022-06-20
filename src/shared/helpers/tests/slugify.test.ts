const slugifyHelper = require('../modelsFieldsHandler/slugify');

describe("Check method 'slugify' ", () => {
  test('should return correct value', () => {
    const result = slugifyHelper.slugify('title');
    expect(result).toMatch('title');
  });
});