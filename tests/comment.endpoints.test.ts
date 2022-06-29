const mongoose = require("mongoose");

import { getMockReq } from '@jest-mock/express'
import request from "supertest";

import app from "../app";
import { requestMock } from '../src/shared/mockes/mockes';

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    { useNewUrlParser: true },
    () => done());
  
  getMockReq(requestMock);
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe("Comment endpoints testing: ", () => {

  test("check route '/api/articles/:slug/comments', method 'get' - should get comments", async () => {
    const req = getMockReq(getMockReq)
    const result = await request(app)
      .get('/api/articles/test-111/comments')
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('comments')
  });

  test("check route '/api/articles/:slug/comments', method 'get' - should not get comments - the Error", async () => {
    await request(app)
      .get('/api/articles/Wrong/comments')
      .expect(422)
  });

});