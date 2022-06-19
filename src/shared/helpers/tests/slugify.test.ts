const serviceSlugify = require('../modelsFieldsHandler/slugify');

describe("Check method 'slugify' ", () => {
  test('should return correct value', () => {
    const result = serviceSlugify.slugify('title');
    expect(result).toMatch('title');
  });
});