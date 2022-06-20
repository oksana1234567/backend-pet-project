const articleController = require('../article.controller');
const articleEntity = require('../../entities/article');
const tagsEntity = require('../../entities/tags');
const articlesFilter = require('../../shared/helpers/filters/articlesFilter');
const articleService = require('../../services/article.service');
import { requireMock, responseMock, articlesMock } from '../../shared/mockes/mockes';

describe("Check method 'postArticle' of articleController", () => {
  test('should return Promise', async () => {
    jest.spyOn(articleService, 'postArticleService').mockResolvedValue(articlesMock);
    const result = articleController.postArticle(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(articleService, 'postArticleService').mockRejectedValue(new Error);
    const result = articleController.postArticle(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getArticle' of articleController", () => {
  test('should return Promise', async () => {
    jest.spyOn(articleEntity, 'getArticleBySlug').mockResolvedValue(articlesMock);
    const result = articleController.getArticle(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'updateArticle' of articleController", () => {
  test('should return Promise', async () => {
    const result = articleController.updateArticle(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getArticles' of articleController", () => {
  test('should return Promise', async () => {
    jest.spyOn(articleEntity, 'getAllArticles').mockResolvedValue(articlesMock);
    const result = articleController.getArticles(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(articleEntity, 'getAllArticles').mockRejectedValue(new Error);
    const result = articleController.getArticles(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getArticlesFeed' of articleController", () => {
  test('should return Promise', async () => {
    jest.spyOn(articleEntity, 'getArticlesForFeed').mockResolvedValue(articlesMock);
    jest.spyOn(articlesFilter, 'filterFeedArticles').mockReturnValue(articlesMock);
    const result = articleController.getArticlesFeed(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(articleEntity, 'getArticlesForFeed').mockRejectedValue(new Error);
    jest.spyOn(articlesFilter, 'filterFeedArticles').mockReturnValue(articlesMock);
    const result = articleController.getArticlesFeed(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'deleteArticle' of articleController", () => {
  test('should return Promise', async () => {
    const result = articleController.deleteArticle(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(articleService, 'deleteArticleService').mockRejectedValue(new Error);
    const result = articleController.deleteArticle(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'favoriteArticle' of articleController", () => {
  test('should return Promise', async () => {
    const result = articleController.favoriteArticle(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'unFavoriteArticle' of articleController", () => {
  test('should return Promise', async () => {
    const result = articleController.unFavoriteArticle(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getTags' of articleController", () => {
  test('should return Promise', async () => {
    jest.spyOn(tagsEntity, 'getTagsDB').mockResolvedValue(['tags']);
    const result = articleController.getTags(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(tagsEntity, 'getTagsDB').mockRejectedValue(new Error);
    const result = articleController.getTags(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});



