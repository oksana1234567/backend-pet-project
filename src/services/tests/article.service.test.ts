const mockingoose = require('mockingoose');
const articleService = require('../article.service');
const favotiteHelperMock = require('../../shared/helpers/favoriteHandler/favorite');
const userEntity = require('../../entities/user');

import Article from "../../models/article.model";
import { requestMock, articlesMock, userMock } from '../../shared/mockes/mockes';
import {
  mockArticleModelSave,
  mockUserModelSave,
  spyOnGetUserByName,
  spyOnGetArticleBySlug,
  spyOnGetUserByToken
} from '../../shared/mockes/functionMockes';
import Articles from "../../shared/interfaces/article.interface";

describe("Check method 'postArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    jest.spyOn(userEntity, 'getUserByToken').mockResolvedValue(userMock);
    const result = articleService.postArticleService(requestMock);
    expect(result.constructor.name).toBe('Promise');
    result.then((res: Articles[]) => {expect(res[0].title).toBe('title')})

  });
});

describe("Check method 'updateArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    jest.spyOn(userEntity, 'getUserByToken').mockResolvedValue(userMock);
    const result = articleService.updateArticleService(requestMock, articlesMock[0]);
    expect(result.constructor.name).toBe('Promise');
    result.then((res: Articles[]) => { expect(res).toMatchObject(articlesMock[0]) });
  });
});

describe("Check method 'deleteArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockingoose(Article).toReturn(articlesMock, 'remove');
    spyOnGetArticleBySlug().mockResolvedValue({ author: { username: 'username' }, remove: () => { } });
    const result = articleService.deleteArticleService(requestMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'favoriteArticleService' of articleService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    mockUserModelSave();
    spyOnGetArticleBySlug().mockResolvedValue(articlesMock);
    spyOnGetUserByToken().mockResolvedValue(userMock);
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
    spyOnGetUserByToken().mockResolvedValue({ save: () => { } });
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

