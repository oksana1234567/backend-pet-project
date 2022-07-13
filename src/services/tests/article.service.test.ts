const mockingoose = require('mockingoose');
const articleService = require('../article.service');
const favotiteHelperMock = require('../../shared/helpers/favoriteHandler/favorite');

import Article from "../../models/article.model";
import { requestMock, articlesMock, userMock } from '../../shared/mockes/mockes';
import {
  mockArticleModelSave,
  mockUserModelSave,
  spyOnGetUserByName,
  spyOnGetArticleBySlug
} from '../../shared/mockes/functionMockes';

describe("Check method 'postArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    const result = articleService.postArticleService(requestMock);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'updateArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    const result = articleService.updateArticleService(requestMock, articlesMock[0]);
    expect(result).toMatchObject(articlesMock[0]);
  });
});

describe("Check method 'deleteArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockingoose(Article).toReturn(articlesMock, 'remove');
    const result = spyOnGetArticleBySlug().mockResolvedValue({ author: { username: 'username' }, remove: () => { } });
    await articleService.deleteArticleService(requestMock);
    jest.spyOn(articleService, 'deleteArticleService');
    expect(result).toHaveBeenCalledTimes(1);
  });
});

describe("Check method 'favoriteArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    mockUserModelSave();
    spyOnGetArticleBySlug().mockResolvedValue(articlesMock);
    spyOnGetUserByName().mockResolvedValue(userMock);
    jest.spyOn(favotiteHelperMock, 'checkFavorite').mockReturnValue(true);
    jest.spyOn(favotiteHelperMock, 'doFavorite');
    const result = articleService.favoriteArticleService(requestMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'unFavoriteArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    mockUserModelSave();
    spyOnGetArticleBySlug().mockResolvedValue({save: () => { }});
    spyOnGetUserByName().mockResolvedValue({ save: () => { } });
    jest.spyOn(favotiteHelperMock, 'checkFavorite').mockReturnValue(false);
    jest.spyOn(favotiteHelperMock, 'doUnFavorite');
    const result = articleService.unFavoriteArticleService(requestMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getFavoritedArticlesService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    mockUserModelSave();
    spyOnGetUserByName().mockResolvedValue(userMock);
    const result = articleService.getFavoritedArticlesService('username', articlesMock)
    expect(result.constructor.name).toBe('Promise');
  });
});

