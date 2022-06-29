const articleFilterHelper = require('../filters/articlesFilter');
import { requestMock, articlesMock, userMock } from '../../mockes/mockes';

describe("Check method 'filterFavoritedArticles' ", () => {
  test('should return correct value', () => {
    const result = articleFilterHelper.filterFavoritedArticles(articlesMock, userMock);
    expect(result).toBeInstanceOf(Array);
  });
});

describe("Check method 'filterOwnArticles' ", () => {
  test('should return correct value', () => {
    const result = articleFilterHelper.filterOwnArticles(articlesMock, 'user');
    expect(result).toEqual(expect.arrayContaining(articlesMock));
  });
});

describe("Check method 'filterFeedArticles' ", () => {
  test('should return correct value', () => {
    const result = articleFilterHelper.filterFeedArticles(articlesMock, requestMock);
    expect(result).toEqual(expect.arrayContaining(articlesMock));
  });
});