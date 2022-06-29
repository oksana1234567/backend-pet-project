const mongoose = require("mongoose");

import { getMockReq } from '@jest-mock/express'
import request from "supertest";
import app from "../app";

import { token, newUserMock, loginUserMock, requestMock } from '../src/shared/mockes/mockes';

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

describe("User endpoints testing: ", () => {

  test("check route '/api/users', method 'post' - should post new user", async () => {
    const result = await request(app)
      .post('/api/users')
      .send(newUserMock)
      .expect(201);
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('usernameTEST');
  });

  test("check route '/api/users', method 'post' - should catch the Error", async () => {
    await request(app)
      .post('/api/users')
      .send({ user: 'user' })
      .expect(500);
  });

  test("check route '/api/users/login', method 'post' - should login the user", async () => {
    const result = await request(app)
      .post('/api/users/login')
      .send(loginUserMock)
      .expect(200);
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('usernameTEST');
  });
  
  test("check route '/api/users/login', method 'post' - should not login the user after invalid Password checking - Error", async () => {
    const result = await request(app)
      .post('/api/users/login')
      .send({ user: { email: "usernameTEST@com", password: "invalid password" } })
      .expect(401);
    expect(result.text).toMatch('Cannot authorize');
  });

  test("check route '/api/users/login', method 'post' - should not login the user - Error", async () => {
    await request(app)
      .post('/api/users/login')
      .send({ user: 'user' })
      .expect(422);
  });

  test("check route '/api/user', method 'get' - should get the user", async () => {
    const result = await request(app)
      .get('/api/user')
      .set('Authorization', token)
    expect(result.constructor.name).toBe('Response');
  });
  
  test("check route '/api/user', method 'get' - should not get the user - the Error", async () => {
    await request(app)
      .get('/api/user')
      .expect(403)
  });
  
  test("check auth middleware without token - status 'No token provided'", async () => {
    await request(app)
      .get('/api/user')
      .expect(403);
  });

  test("check route '/api/user', method 'put' - should update the user", async () => {
    const result = await request(app)
      .put('/api/user')
      .set('Authorization', token)
      .send({ user: { bio: 'new bio' } })
    expect(result.constructor.name).toBe('Response');

  });
  
  test("check route '/api/user', method 'put' - should not update the user - the Error", async () => {
    await request(app)
      .put('/api/user')
      .set('Authorization', token)
      .send({ user: { invalidField: 'invalid value' } })
      .expect(500)
  });
  
});