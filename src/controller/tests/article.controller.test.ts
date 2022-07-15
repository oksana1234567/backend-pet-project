const articleController = require('../article.controller');
const articleEntity = require('../../entities/article');
const userEntity = require('../../entities/user');
const tagsEntity = require('../../entities/tags');
const articlesFilter = require('../../shared/helpers/filters/articlesFilter');
const articleService = require('../../services/article.service');
const profileService = require('../../services/profile.service');

import { requestMock, responseMock, articlesMock, userMock } from '../../shared/mockes/mockes';

describe("Check method 'postArticle' of articleController", () => {
  test('should return Promise', async () => {
    jest.spyOn(articleService, 'postArticleService').mockResolvedValue(articlesMock);
    const result = articleController.postArticle(requestMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(articleService, 'postArticleService').mockRejectedValue(new Error);
    const result = articleController.postArticle(requestMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getArticle' of articleController", () => {
  test('should return Promise', async () => {
    jest.spyOn(articleEntity, 'getArticleBySlug').mockResolvedValue(articlesMock);
    jest.spyOn(userEntity, 'getUserByToken').mockResolvedValue(userMock);
    // const result = articleController.getArticle(requestMock, responseMock);
    // expect(result.constructor.name).toBe('Promise');
   articleController.getArticle(requestMock, responseMock).then((res: any) => {expect(res).toBe(1)})
  });
});

// describe("Check method 'updateArticle' of articleController", () => {
//   test('should return Promise', async () => {
//     const result = articleController.updateArticle(requestMock, responseMock);
//     expect(result.constructor.name).toBe('Promise');
//   });
// });

// describe("Check method 'getArticles' of articleController", () => {
//   test('should return Promise', async () => {
//     jest.spyOn(articleEntity, 'getAllArticles').mockResolvedValue(articlesMock);
//     jest.spyOn(articleService, 'getFavoritedArticlesService').mockResolvedValue(articlesMock);
//     jest.spyOn(articlesFilter, 'filterOwnArticles').mockResolvedValue(articlesMock);
//     const result = articleController.getArticles(requestMock, responseMock);
//     expect(result.constructor.name).toBe('Promise');
//   });

//   test('should catch Error', async () => {
//     jest.spyOn(articleEntity, 'getAllArticles').mockRejectedValue(new Error);
//     const result = articleController.getArticles(requestMock, responseMock);
//     expect(result.constructor.name).toBe('Promise');
//   });
// });

// describe("Check method 'getArticlesFeed' of articleController", () => {
//   test('should return Promise', async () => {
//     jest.spyOn(articleEntity, 'getArticlesForFeed').mockResolvedValue(articlesMock);
//     jest.spyOn(articlesFilter, 'filterFeedArticles').mockReturnValue(articlesMock);
//     const result = articleController.getArticlesFeed(requestMock, responseMock);
//     expect(result.constructor.name).toBe('Promise');
//   });

//   test('should be handled for empty feed', async () => {
//     const reqMock = { user: { username: 'username', following: [] } };
//     jest.spyOn(articleEntity, 'getArticlesForFeed').mockResolvedValue(articlesMock);
//     jest.spyOn(articlesFilter, 'filterFeedArticles').mockReturnValue(articlesMock);
//     const result = articleController.getArticlesFeed(reqMock, responseMock);
//     expect(result).toBeNull;
//   });

//   test('should catch Error', async () => {
//     jest.spyOn(articleEntity, 'getArticlesForFeed').mockRejectedValue(new Error);
//     jest.spyOn(articlesFilter, 'filterFeedArticles').mockReturnValue(articlesMock);
//     const result = articleController.getArticlesFeed(requestMock, responseMock);
//     expect(result.constructor.name).toBe('Promise');
//   });
// });

// describe("Check method 'deleteArticle' of articleController", () => {
//   test('should return Promise', async () => {
//     const result = articleController.deleteArticle(requestMock, responseMock);
//     expect(result.constructor.name).toBe('Promise');
//   });

//   test('should catch Error', async () => {
//     jest.spyOn(articleService, 'deleteArticleService').mockRejectedValue(new Error);
//     const result = articleController.deleteArticle(requestMock, responseMock);
//     expect(result.constructor.name).toBe('Promise');
//   });
// });

// describe("Check method 'favoriteArticle' of articleController", () => {
//   test('should return Promise', async () => {
//     const result = articleController.favoriteArticle(requestMock, responseMock);
//     expect(result.constructor.name).toBe('Promise');
//   });
// });

// describe("Check method 'unFavoriteArticle' of articleController", () => {
//   test('should return Promise', async () => {
//     const result = articleController.unFavoriteArticle(requestMock, responseMock);
//     expect(result.constructor.name).toBe('Promise');
//   });
// });

// describe("Check method 'getTags' of articleController", () => {
//   test('should return Promise', async () => {
//     jest.spyOn(tagsEntity, 'getTagsDB').mockResolvedValue(['tags']);
//     const result = articleController.getTags(requestMock, responseMock);
//     expect(result.constructor.name).toBe('Promise');
//   });

//   test('should catch Error', async () => {
//     jest.spyOn(tagsEntity, 'getTagsDB').mockRejectedValue(new Error);
//     const result = articleController.getTags(requestMock, responseMock);
//     expect(result.constructor.name).toBe('Promise');
//   });
// });