import { jest } from '@jest/globals';
import Article from "../../models/article.model";
import { requireMock, responseMock, articlesMock, userMock } from '../../shared/mockes/mockes';
import {mockArticleModelSave, mockUserModelSave, spyOnGetUserByName, spyOnGetArticleBySlug } from '../../shared/mockes/functionMockes'
const mockingoose = require('mockingoose');
const articleService = require('../article.service');
const favotiteHelperMock = require('../../shared/helpers/favoriteHandler/favorite');
    
describe("Check method 'postArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    const result = articleService.postArticleService(requireMock);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'updateArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    const result = articleService.updateArticleService(requireMock, responseMock, articlesMock[0]);
    expect(result).toMatchObject(articlesMock[0]);
  });
});

describe("Check method 'deleteArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockingoose(Article).toReturn(articlesMock, 'remove');
    const spyResult = spyOnGetArticleBySlug().mockResolvedValue(articlesMock)
    await articleService.deleteArticleService(requireMock, responseMock);
    jest.spyOn(articleService, 'deleteArticleService');
    expect(spyResult).toBeCalledTimes(1);
  });
});

describe("Check method 'favoriteArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    mockUserModelSave();
    spyOnGetArticleBySlug().mockResolvedValue(articlesMock);
    spyOnGetUserByName().mockResolvedValue(userMock);
    jest.spyOn(favotiteHelperMock, 'checkFavorite').mockReturnValue(true);
    jest.spyOn(favotiteHelperMock, 'manageModelsChangesFavorite');
    const result = articleService.favoriteArticleService(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

    test('should catch Error', async () => {
    mockArticleModelSave();
    mockUserModelSave();
    spyOnGetArticleBySlug().mockResolvedValue(articlesMock);
    spyOnGetUserByName().mockRejectedValue(new Error);
    jest.spyOn(favotiteHelperMock, 'checkFavorite').mockReturnValue(true);
    jest.spyOn(favotiteHelperMock, 'manageModelsChangesFavorite');
    const result = articleService.favoriteArticleService(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'unFavoriteArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    mockUserModelSave();
    spyOnGetArticleBySlug().mockResolvedValue(articlesMock);
    spyOnGetUserByName().mockResolvedValue(userMock);
    jest.spyOn(favotiteHelperMock, 'checkFavorite').mockReturnValue(true);
    jest.spyOn(favotiteHelperMock, 'manageModelsChangesUnFavorite');
    const result = articleService.unFavoriteArticleService(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    mockArticleModelSave();
    mockUserModelSave();
    spyOnGetArticleBySlug().mockResolvedValue(articlesMock);
    spyOnGetUserByName().mockRejectedValue(new Error);
    jest.spyOn(favotiteHelperMock, 'checkFavorite').mockReturnValue(true);
    jest.spyOn(favotiteHelperMock, 'manageModelsChangesUnFavorite');
    const result = articleService.unFavoriteArticleService(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getFavoritedArticlesService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    mockUserModelSave();
    spyOnGetUserByName().mockResolvedValue(userMock);
    const result = articleService.getFavoritedArticlesService('username', articlesMock, responseMock)
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    mockArticleModelSave();
    mockUserModelSave();
    spyOnGetUserByName().mockRejectedValue(new Error);
    const result = articleService.getFavoritedArticlesService('username', articlesMock, responseMock)
    expect(result.constructor.name).toBe('Promise');
  });
});

