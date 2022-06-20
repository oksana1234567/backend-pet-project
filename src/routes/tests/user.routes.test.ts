import { getMockReq } from '@jest-mock/express'
import request from "supertest";
import app from "../../../app";
import { token, newUserMock, loginUserMock } from '../../shared/mockes/mockes';
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

  test("check route '/api/users' - should post new user", async () => {
    await request(app)
      .post('/api/users')
      .send(newUserMock)
      .expect(201);
  });
  
  test("check route '/api/users/login' - should not login user - Error", async () => {
    await request(app)
      .post('/api/users/login')
      .send({ user: 'user' })
      .expect(422);
  });
  
  test("check route '/api/user' - should not get user - Error", async () => {
    await request(app)
      .get('/api/user')
      .expect(403)
  });
  
  test("check route '/api/users/login' - should login user", async () => {
    await request(app)
      .post('/api/users/login')
      .send(loginUserMock)
      .expect(200)
  });
  
  test("check auth middleware without token - status 'No token provided'", async () => {
    await request(app)
      .get('/api/user')
      .expect(403);
  });

  test("check auth middleware with token", async () => {
    const req = getMockReq({ headers: { authorization: token }, user: { username: 'usernameTest' } })
    const result = await request(app)
      .get('/api/user')
      .set('Authorization', token)
    expect(result).toBeTruthy();
  });
});


