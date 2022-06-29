const mongoose = require("mongoose");

import { getMockReq } from '@jest-mock/express'
import request from "supertest";

import app from "../app";
import User from '../src/models/user.model';
import { requestMock, token } from '../src/shared/mockes/mockes';

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    { useNewUrlParser: true },
    () => done());
  
  getMockReq(requestMock);

  new User({
    username:'test',
    email: 'test@com',
    password: '121212',
    bio: 'bio',
    image: 'https://static.productionready.io/images/smiley-cyrus.jpg'
  }).save()
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe("Profile endpoints testing: ", () => {

  test("check route '/api/profiles/:username', method 'get' - should get the Profile", async () => {
    const result = await request(app)
      .get('/api/profiles/test')
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/profiles/:username', method 'get' - should not get the Profile - the Error", async () => {
    await request(app)
      .get('/api/profiles/Wrong')
      .expect(500)
  });

  test("check route '/api/profiles/:username/follow', method 'post' - should follow the profile", async () => {
    const result = await request(app)
      .post('/api/profiles/test/follow')
      .set('Authorization', token)
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/profiles/:username/follow', method 'post' - should not follow the profile - the Error", async () => {
    await request(app)
      .post('/api/profiles/Wrong/follow')
      .set('Authorization', token)
      .expect(422)
  });

  test("check route '/api/profiles/:username/follow', method 'delete' - should delete following the profile", async () => {
    const result = await request(app)
      .delete('/api/profiles/test/follow')
      .set('Authorization', token)
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/profiles/:username/follow', method 'delete' - should not delete following the profile - the Error", async () => {
    await request(app)
      .delete('/api/profiles/Wrong/follow')
      .set('Authorization', token)
      .expect(422)
  });
});

