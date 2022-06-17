const articleEntities = require('../article');

const reqMock = { params: { slug: 'slug' }, query: { limit: '1', offset: '1' }, user: {following: []} };

describe("Check method 'getArticleBySlug' ", () => {
  test('should return correct value', () => {
    const result = articleEntities.getArticleBySlug(reqMock);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'getAllArticles' ", () => {
  test('should return correct value', () => {
    const result = articleEntities.getAllArticles(reqMock);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'getArticlesForFeed' ", () => {
  test('should return correct value', () => {
    const result = articleEntities.getArticlesForFeed(reqMock);
    expect(result).toBeInstanceOf(Object);
  });
});