import { getMockReq } from '@jest-mock/express'
import request from "supertest";
import app from "../app";
import { token, requireMock } from '../src/shared/mockes/mockes';
// import { articleEntityToTest } from '../src/shared/mockes/functionMockes';
import Article from '../src/models/article.model';
const mongoose = require("mongoose");

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
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

  test("check route '/api/tags' - should get tags", async () => {
    const result = await request(app)
      .get('/api/tags')
      .expect(200)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('tags')
  });

  test("check route '/api/articles/feed', method 'get' - should get articles feed", async () => {
    const req = getMockReq(requireMock);
    const result = await request(app)
      .get('/api/articles/feed')
      .set('Authorization', token)
      .send(req)
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles/feed', method 'get' - should not get articles feed - the Error", async () => {
    await request(app)
      .get('/api/articles/feed')
      .set('Authorization', token)
      .expect(500)
  });

  test("check route '/api/articles/:slug/favorite', method 'post' - should favorite the article", async () => {
    const result = await request(app)
      .post('/api/articles/test-111/favorite')
      .set('Authorization', token)
    expect(result.constructor.name).toBe('Response');
  });

  test("check route '/api/articles', method 'get' - should get articles", async () => {
    const result = await request(app)
      .get('/api/articles')
      .set('Authorization', token)
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles', method 'post' - should post new article", async () => {
    const result = await request(app)
      .post('/api/articles')
      .set('Authorization', token)
      .send({ article: { slug: 'slug-111', title: 'titleTest', description: 'description', body: 'body', tagList: 'tagList' } })
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles', method 'post' - should not post new article - the Error", async () => {
    const req = getMockReq(requireMock)
    await request(app)
      .post('/api/articles')
      .set('Authorization', token)
      .send({})
      .expect(500)
  });

  // test("check route '/api/articles/:slug', method 'get' - should get article", async () => {
  //   const result = await request(app)
  //     .get('/api/articles/test-111')
  //   expect(result.constructor.name).toBe('Response');
  // });
  
  test("check route '/api/articles/:slug', method 'get' - should not get article - the Error", async () => {
    await request(app)
      .get('/api/articles/test-111')
      .expect(422)
  });

  test("check route '/api/articles/:slug', method 'put' - should update the article", async () => {
    const req = getMockReq(requireMock)
    const result = await request(app)
      .put('/api/articles/test-111')
      .set('Authorization', token)
      .send({ article: { description: 'new description' } })
      .send(req)
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles/:slug', method 'put' - should not update the article - the Error", async () => {
    const req = getMockReq(requireMock)
    await request(app)
      .put('/api/articles/test-111')
      .set('Authorization', token)
      .send({ artcle: { invalidField: 'invalid value' } })
      .expect(422)
  });

  test("check route '/api/articles/:slug', method 'delete' - should delete the article", async () => {
    const req = getMockReq(requireMock)
    const result = await request(app)
      .delete('/api/articles/test-111')
      .set('Authorization', token)
    expect(result.constructor.name).toBe('Response');
  });
});


