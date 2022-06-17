import mongoose from "mongoose";
const articleController = require('../article.controller');

const reqArticleControllerMock = {query: {favorited: [], author: {username: 'username'}}, params: { slug: 'slug-111' }, user: { username: 'username' }, body: { article: { title: 'test', description: 'description', body: 'body', tagList: 'tagList'  } } };
const mockArticleResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
  }
};

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    () => done());
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe("Check method 'postArticle' ", () => {
  test('should return correct value', async () => {
    const result = articleController.postArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'getArticle' ", () => {
  test('should return correct value', async () => {
    const result = articleController.getArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'updateArticle' ", () => {
  test('should return correct value', async () => {
    const result = articleController.updateArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'getArticles' ", () => {
  test('should return correct value', async () => {
    const result = articleController.getArticles(reqArticleControllerMock, mockArticleResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'getArticlesFeed' ", () => {
  test('should return correct value', async () => {
    const result = articleController.getArticlesFeed(reqArticleControllerMock, mockArticleResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'deleteArticle' ", () => {
  test('should return correct value', async () => {
    const result = articleController.deleteArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'favoriteArticle' ", () => {
  test('should return correct value', async () => {
    const result = articleController.favoriteArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'unFavoriteArticle' ", () => {
  test('should return correct value', async () => {
    const result = articleController.unFavoriteArticle(reqArticleControllerMock, mockArticleResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'getTags' ", () => {
  test('should return correct value', async () => {
    const result = articleController.getTags(reqArticleControllerMock, mockArticleResponse);
    expect(result).toBeInstanceOf(Object);
  });
});



