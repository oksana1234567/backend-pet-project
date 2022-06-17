import mongoose from "mongoose";
import Article from "../../models/article.model";
import User from "../../models/user.model";

const articleService = require('../article.service');

const reqArticleMock = {params: { slug: 'slug-111' }, user: { username: 'user' }, body: { article: { title: 'title', description: 'description', body: 'body', tagList: 'tagList' } } };
const articleServiceDraft = { title: 'title', description: 'description', body: 'body', tagList: 'tagList', author: { username: 'user' }, save: () => { } };
const mock = {
  params: { slug: 'slug-111' },
  user: { username: 'username' }
};
const mockResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
  }
};

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    () => done());
  
  new Article({
    slug: 'title-111',
    title: 'title',
    description: 'description',
    body: 'body',
    tagList: ['tagList'],
    createdAt: new Date(),
    updatedAt: new Date(),
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'username',
      bio: 'bio',
      image: 'image',
      following: []
    }
  }
  ).save();

  new User({
    username: 'test',
    email: 'test@com',
    password: 'password',
    bio: 'bio',
    image: 'image',
    favorites: [],
    following: []
}).save();  
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});
    
describe("Check method 'postArticleService' ", () => {
  test('should return correct value', async () => {
    const result = articleService.postArticleService(reqArticleMock);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'updateArticleService' ",  () => {
  test('should return correct value', async () => {
    const result = articleService.updateArticleService(reqArticleMock, mockResponse, articleServiceDraft);
    expect(result).toMatchObject(articleServiceDraft);
  });
});

// check return value
describe("Check method 'deleteArticleService' ", () => {
  test('should return correct value', async () => {
    const result = await articleService.deleteArticleService(mock);
    expect(result).toBeFalsy()
});
});

describe("Check method 'favoriteArticleService' ", () => {
  test('should return correct value', async () => {
    const result = await articleService.favoriteArticleService(mock, mockResponse);
    expect(result).toBeInstanceOf(Object);
});
});

describe("Check method 'unFavoriteArticleService' ", () => {
  test('should return correct value', async () => {
    const result = await articleService.unFavoriteArticleService(mock, mockResponse);
    expect(result).toBeInstanceOf(Object);
});
});
