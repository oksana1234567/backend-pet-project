
const articleController = require('../article.controller');
const articleEntityMock = require('../../entities/article');
const tagsEntityMock = require('../../entities/tags');
const articlesFilter = require('../../shared/helpers/filters/articlesFilter');
const articleServiceForMock = require('../../services/article.service');

const reqArticleControllerMock = { query: { favorited: 'username', author: { username: 'username' } }, params: { slug: 'slug-111' }, user: { username: 'username' }, body: { article: { title: 'test', description: 'description', body: 'body', tagList: 'tagList' } } };
const articleServiceDraft = [{ title: 'title', description: 'description', body: 'body', tagList: 'tagList', author: { username: 'username' }, save: () => { }, _id: 'id' }];
const mockArticleResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
  }
};

describe("Check method 'postArticle' ", () => {
  test('should return correct value', async () => {
    jest.spyOn(articleServiceForMock, 'postArticleService').mockResolvedValue(articleServiceDraft);
    const result = articleController.postArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(articleServiceForMock, 'postArticleService').mockRejectedValue(new Error);
    const result = articleController.postArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getArticle' ", () => {
  test('should return correct value', async () => {
    jest.spyOn(articleEntityMock, 'getArticleBySlug').mockResolvedValue(articleServiceDraft);
    const result = articleController.getArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'updateArticle' ", () => {
  test('should return correct value', async () => {
    const result = articleController.updateArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getArticles' ", () => {
  test('should return correct value', async () => {
    jest.spyOn(articleEntityMock, 'getAllArticles').mockResolvedValue(articleServiceDraft);
    const result = articleController.getArticles(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(articleEntityMock, 'getAllArticles').mockRejectedValue(new Error);
    const result = articleController.getArticles(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getArticlesFeed' ", () => {
  test('should return correct value', async () => {
    jest.spyOn(articleEntityMock, 'getArticlesForFeed').mockResolvedValue(articleServiceDraft);
    jest.spyOn(articlesFilter, 'filterFeedArticles').mockReturnValue(articleServiceDraft);
    const result = articleController.getArticlesFeed(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(articleEntityMock, 'getArticlesForFeed').mockRejectedValue(new Error);
    jest.spyOn(articlesFilter, 'filterFeedArticles').mockReturnValue(articleServiceDraft);
    const result = articleController.getArticlesFeed(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'deleteArticle' ", () => {
  test('should return correct value', async () => {
    const result = articleController.deleteArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(articleServiceForMock, 'deleteArticleService').mockRejectedValue(new Error);
    const result = articleController.deleteArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'favoriteArticle' ", () => {
  test('should return correct value', async () => {
    const result = articleController.favoriteArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'unFavoriteArticle' ", () => {
  test('should return correct value', async () => {
    const result = articleController.unFavoriteArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getTags' ", () => {
  test('should return correct value', async () => {
    jest.spyOn(tagsEntityMock, 'getTagsDB').mockResolvedValue(['tags']);
    const result = articleController.getTags(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(tagsEntityMock, 'getTagsDB').mockRejectedValue(new Error);
    const result = articleController.getTags(reqArticleControllerMock, mockArticleResponse);
    expect(result.constructor.name).toBe('Promise');
  });
});



