const mongoose = require("mongoose");
const userEntity = require('../src/entities/user');

import request from "supertest";

import app from "../app";
import { token, userMock } from '../src/shared/mockes/mockes';
import Article from '../src/models/article.model';

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    { useNewUrlParser: true },
    () => done());

  new Article({
    slug: 'test-111',
    title: 'title new',
    description: 'description',
    body: 'body',
    tagList: ['tagList'],
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'username',
      bio: 'bio',
      image: 'image',
      following: false,
    }
  }
  ).save();
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe("Article route testing: ", () => {

  test("check route '/api/tags', method 'get' - should get tags", async () => {
    const result = await request(app)
      .get('/api/tags')
      .expect(200)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('tags')
  });

  test("check route '/api/articles/feed', method 'get' - should get articles feed", async () => {
    jest.spyOn(userEntity, 'getUserByToken').mockResolvedValue(userMock);
    const result = await request(app)
      .get('/api/articles/feed')
      .set('Authorization', token)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('articles')
  });
  
  test("check route '/api/articles/feed', method 'get' - should not get articles feed - Error", async () => {
    jest.spyOn(userEntity, 'getUserByToken').mockResolvedValue({});
    await request(app)
      .get('/api/articles/feed')
      .set('Authorization', token)
      .expect(422)
  });

  test("check route '/api/articles', method 'get' - should get articles", async () => {
    const result = await request(app)
      .get('/api/articles')
      .set('Authorization', token)
      .expect(200)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('articles');
  });
  
  test("check route '/api/articles', method 'post' - should post new article", async () => {
    jest.spyOn(userEntity, 'getUserByToken').mockResolvedValue(userMock);
    const result = await request(app)
      .post('/api/articles')
      .set('Authorization', token)
      .send({ article: { slug: 'slug-111', title: 'titleTest', description: 'description', body: 'body', tagList: 'tagList' } })
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('"title":"titleTest"');
  });
  
  test("check route '/api/articles', method 'post' - should not post new article - Error", async () => {
    await request(app)
      .post('/api/articles')
      .set('Authorization', token)
      .send({})
      .expect(422)
  });

  test("check route '/api/articles/:slug', method 'get' - should get article", async () => {
    const result = await request(app)
      .get('/api/articles/test-111')
      .expect(200)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('"slug":"test-111"');
  });
  
  test("check route '/api/articles/:slug', method 'get' - should not get article - Error", async () => {
    const result = await request(app)
      .get('/api/articles/Wrong')
      .expect(422)
    expect(result.text).toMatch('errors')
  });

  test("check route '/api/articles/:slug', method 'put' - should update the article", async () => {
    const result = await request(app)
      .put('/api/articles/test-111')
      .set('Authorization', token)
      .send({ article: { description: 'description' } })
      .expect(200)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('"description":"description"');
  });

  test("check route '/api/articles/:slug', method 'delete' - should delete the article", async () => {
    const result = await request(app)
      .delete('/api/articles/test-111')
      .set('Authorization', token)
      .expect(200)
    expect(result.constructor.name).toBe('Response');
  });

  test("check route '/articles/:slug/favorite', method 'post' - should favorite the article", async () => {
    const result = await request(app)
      .post('/api/articles/test-111/favorite')
      .set('Authorization', token)
      .expect(200)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('article');
  });

  test("check route '/articles/:slug/favorite', method 'delete' - should cancell favorite the article", async () => {
    const result = await request(app)
      .delete('/api/articles/test-111/favorite')
      .set('Authorization', token)
      .expect(200)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('article');
  });
});
