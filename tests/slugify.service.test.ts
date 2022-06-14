const serviceSlugify = require('../shared/services/slugify.service');

describe("Check method 'slugify' ", () => {
    test('should return correct value', () => {
        const result = serviceSlugify.slugify('title');
        expect(result).toMatch('title');
  });
});