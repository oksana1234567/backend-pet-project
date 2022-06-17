const articleFilter = require('../filters/articlesFilter');


const user = { favorites: [{ article: { _id: '111' } }] };
const articles = [{ _id: '111', author: { username: 'user' } }];
const reqDraft = { user: { following: [{ username: 'user' }] } };

describe("Check method 'filterFavoritedArticles' ", () => {
  test('should return correct value', () => {
    const result = articleFilter.filterFavoritedArticles(articles, user);
    expect(result).toEqual(expect.arrayContaining(articles));
  });
});

describe("Check method 'filterOwnArticles' ", () => {
  test('should return correct value', () => {
    const result = articleFilter.filterOwnArticles(articles, 'user');
    expect(result).toEqual(expect.arrayContaining(articles));
  });
});

describe("Check method 'filterFeedArticles' ", () => {
  test('should return correct value', () => {
    const result = articleFilter.filterFeedArticles(articles, reqDraft);
    expect(result).toEqual(expect.arrayContaining(articles));
  });
});