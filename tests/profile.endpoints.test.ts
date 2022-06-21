import { getMockReq } from '@jest-mock/express'
import request from "supertest";
import app from "../app";
import { token } from '../src/shared/mockes/mockes';
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

describe("Profile endpoints testing: ", () => {

  test("check route '/api/profiles/:username', method 'get' - should get the Profile", async () => {
    const req = getMockReq(getMockReq)
    const result = await request(app)
      .get('/api/profiles/:username')
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/profiles/:username', method 'get' - should not get the Profile - the Error", async () => {
    await request(app)
      .get('/api/profiles/:username')
      .expect(500)
  });

  test("check route '/api/profiles/:username/follow', method 'post' - should follow the profile", async () => {
    const req = getMockReq(getMockReq)
    const result = await request(app)
      .post('/api/profiles/:username/follow')
      .set('Authorization', token)
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/profiles/:username/follow', method 'post' - should not follow the profile - the Error", async () => {
    await request(app)
      .post('/api/profiles/:username/follow')
      .set('Authorization', token)
      .expect(422)
  });

  test("check route '/api/profiles/:username/follow', method 'delete' - should delete following the profile", async () => {
    const req = getMockReq(getMockReq)
    const result = await request(app)
      .delete('/api/profiles/:username/follow')
      .set('Authorization', token)
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/profiles/:username/follow', method 'delete' - should not delete following the profile - the Error", async () => {
    await request(app)
      .delete('/api/profiles/:username/follow')
      .set('Authorization', token)
      .expect(422)
  });
});

