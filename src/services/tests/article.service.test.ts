import { jest } from '@jest/globals';
import Article from "../../models/article.model";
import User from "../../models/user.model";

const mockingoose = require('mockingoose');
const articleService = require('../article.service');
const articleEntityMock = require('../../entities/article');
const userEntityMock = require('../../entities/user');
const favotiteHelperMock = require('../../shared/helpers/favoriteHandler/favorite')

const reqArticleMock = {params: { slug: 'slug-111' }, user: { username: 'username' }, body: { article: { title: 'title', description: 'description', body: 'body', tagList: 'tagList' } } };
const articleServiceDraft = { title: 'title', description: 'description', body: 'body', tagList: 'tagList', author: { username: 'username' }, save: () => { } };
const userServiceDraft = { username: 'username', email: 'test2@com', bio: 'bio', image: 'image' };
const reqMock = {
  params: { slug: 'slug-111' },
  user: { username: 'username' }
};
const mockResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
  }
};
    
describe("Check method 'postArticleService' ", () => {
  test('should return correct value', async () => {
    mockingoose(Article).toReturn(articleServiceDraft, 'save');
    const result = articleService.postArticleService(reqArticleMock);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'updateArticleService' ", () => {
  test('should return correct value', async () => {
    mockingoose(Article).toReturn(articleServiceDraft, 'save');
    const result = articleService.updateArticleService(reqArticleMock, mockResponse, articleServiceDraft);
    expect(result).toMatchObject(articleServiceDraft);
  });
});

describe("Check method 'deleteArticleService' ", () => {
  test('should return correct value', async () => {
    mockingoose(Article).toReturn(articleServiceDraft, 'remove');
    const spyResult = jest.spyOn(articleEntityMock, 'getArticleBySlug').mockResolvedValue(articleServiceDraft)
    const result = await articleService.deleteArticleService(reqMock, mockResponse);
    const resultSpy = jest.spyOn(articleService, 'deleteArticleService');
    expect(spyResult).toBeCalledTimes(1);
  });
});

describe("Check method 'favoriteArticleService' ", () => {
  test('should return correct value', async () => {
    mockingoose(Article).toReturn(articleServiceDraft, 'save');
    mockingoose(User).toReturn(userServiceDraft, 'save');
    const spyResult = jest.spyOn(articleEntityMock, 'getArticleBySlug').mockResolvedValue(articleServiceDraft);
    jest.spyOn(userEntityMock, 'getUserByName').mockResolvedValue(userServiceDraft);
    jest.spyOn(favotiteHelperMock, 'checkFavorite').mockReturnValue(true);
    jest.spyOn(favotiteHelperMock, 'manageModelsChangesFavorite');
    const result = jest.spyOn(articleService, 'favoriteArticleService');
    expect(spyResult).toHaveReturned();
  });
});

describe("Check method 'unFavoriteArticleService' ", () => {
  test('should return correct value', async () => {
    mockingoose(Article).toReturn(articleServiceDraft, 'save');
    mockingoose(User).toReturn(userServiceDraft, 'save');
    const spyResult = jest.spyOn(articleEntityMock, 'getArticleBySlug').mockResolvedValue(articleServiceDraft);
    jest.spyOn(userEntityMock, 'getUserByName').mockResolvedValue(userServiceDraft);
    jest.spyOn(favotiteHelperMock, 'checkFavorite').mockReturnValue(true);
    jest.spyOn(favotiteHelperMock, 'manageModelsChangesUnFavorite');
    const result = jest.spyOn(articleService, 'unFavoriteArticleService');
    expect(spyResult).toHaveReturned();
  });
});

