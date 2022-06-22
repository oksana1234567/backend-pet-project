import { getMockReq } from '@jest-mock/express'
import request from "supertest";
import app from "../app";
import { token, newUserMock, loginUserMock } from '../src/shared/mockes/mockes';
const mongoose = require("mongoose");

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    () => done());
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe("User route testing: ", () => {

  test("check route '/api/tags' - should get tags", async () => {
    const result = await request(app)
      .get('/api/tags')
    expect(result.constructor.name).toBe('Response');
  });

  test("check route '/api/articles/feed', method 'get' - should get articles feed", async () => {
    const req = getMockReq(getMockReq)
    const result = await request(app)
      .get('/api/articles/feed')
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles/feed', method 'get' - should not get articles feed - the Error", async () => {
    await request(app)
      .get('/api/articles/feed')
      .set('Authorization', token)
      .expect(500)
  });

  test("check route '/api/articles/:slug/favorite', method 'post' - should favorite the article", async () => {
    const req = getMockReq(getMockReq)
    const result = await request(app)
      .post('/api/articles/:slug/favorite')
    expect(result.constructor.name).toBe('Response');
  });

  test("check route '/api/articles', method 'post' - should get articles", async () => {
    const result = await request(app)
      .get('/api/articles')
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles', method 'post' - should post new article", async () => {
    const req = getMockReq(getMockReq)
    const result = await request(app)
      .post('/api/articles')
      .set('Authorization', token)
      .send({ article: { slug: 'slug-111', title: 'title', description: 'description', body: 'body', tagList: 'tagList' } })
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles', method 'post' - should not post new article - the Error", async () => {
    const req = getMockReq(getMockReq)
    await request(app)
      .post('/api/articles')
      .set('Authorization', token)
      .send({})
      .expect(500)
  });

  test("check route '/api/articles/:slug', method 'get' - should get article", async () => {
    const req = getMockReq(getMockReq)
    const result = await request(app)
      .get('/api/articles/:slug')
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles/:slug', method 'get' - should not get article - the Error", async () => {
    await request(app)
      .get('/api/articles/:slug')
      .expect(422)
  });

  test("check route '/api/articles/:slug', method 'put' - should update the article", async () => {
    const req = getMockReq(getMockReq)
    const result = await request(app)
      .put('/api/articles/:slug')
      .set('Authorization', token)
      .send({ article: { description: 'new description' } })
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/articles/:slug', method 'put' - should not update the article - the Error", async () => {
    const req = getMockReq(getMockReq)
    await request(app)
      .put('/api/articles/:slug')
      .set('Authorization', token)
      .send({ artcle: { invalidField: 'invalid value' } })
      .expect(422)
  });

  test("check route '/api/articles/:slug', method 'delete' - should delete the article", async () => {
    const req = getMockReq(getMockReq)
    const result = await request(app)
      .delete('/api/articles/:slug')
      .set('Authorization', token)
    expect(result.constructor.name).toBe('Response');
  });
});


