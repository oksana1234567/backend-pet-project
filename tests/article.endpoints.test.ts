const mongoose = require("mongoose");

import { getMockReq } from '@jest-mock/express'
import request from "supertest";

import app from "../app";
import { token, requestMock } from '../src/shared/mockes/mockes';
import Article from '../src/models/article.model';

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    { useNewUrlParser: true },
    () => done());
  
  getMockReq(requestMock);

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

  test("check route '/api/tags' - should get tags", async () => {
    const result = await request(app)
      .get('/api/tags')
      .expect(200)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('tags')
  });

  test("check route '/api/articles/feed', method 'get' - should get articles feed", async () => {
    const result = await request(app)
      .get('/api/articles/feed')
      .set('Authorization', token)
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles/feed', method 'get' - should not get articles feed - the Error", async () => {
    await request(app)
      .get('/api/articles/feed')
      .set('Authorization', token)
      .expect(500)
  });

  test("check route '/api/articles', method 'get' - should get articles", async () => {
    const result = await request(app)
      .get('/api/articles')
      .set('Authorization', token)
      .expect(200)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('articles')
  });
  
  test("check route '/api/articles', method 'post' - should post new article", async () => {
    const result = await request(app)
      .post('/api/articles')
      .set('Authorization', token)
      .set('User', '{username: "username"}')
      .send({ article: { slug: 'slug-111', title: 'titleTest', description: 'description', body: 'body', tagList: 'tagList' } })
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles', method 'post' - should not post new article - the Error", async () => {
    await request(app)
      .post('/api/articles')
      .set('Authorization', token)
      .send({})
      .expect(500)
  });

  test("check route '/api/articles/:slug', method 'get' - should get article", async () => {
    const result = await request(app)
      .get('/api/articles/test-111')
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles/:slug', method 'get' - should not get article - the Error", async () => {
    const result = await request(app)
      .get('/api/articles/Wrong')
      .expect(422)
    expect(result.text).toMatch('errors')
  });

  test("check route '/api/articles/:slug', method 'put' - should update the article", async () => {
    const result = await request(app)
      .put('/api/articles/test-111')
      .set('Authorization', token)
      .send({ article: { description: 'new description' } })
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles/:slug', method 'put' - should not update the article - the Error", async () => {
    const result = await request(app)
      .put('/api/articles/test-111')
      .set('Authorization', token)
      .send({invalid: {invalid: 'invalid'}})
      .expect(422)
    expect(result.text).toMatch('errors')
  });

  test("check route '/api/articles/:slug', method 'delete' - should delete the article", async () => {
    const result = await request(app)
      .delete('/api/articles/test-111')
      .set('Authorization', token)
      .expect(200)
    expect(result.constructor.name).toBe('Response');
  });
});


