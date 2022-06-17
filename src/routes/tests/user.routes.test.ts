// jest.mock('../../middleware/authorization.middlware.ts', () =>
  // ensure func is mocked before being attached to the app instance
  // jest.fn((req, res, next) => next()) // seems to only work for first request that hits this middleware
  // jest.fn((req, res, next) => next())
// ); // Mock authentication
import { getMockReq } from '@jest-mock/express'
import { Response } from "express";
import request from "supertest";
const mongoose = require("mongoose");
import app from "../../../app";

const draftNewUser = {
  "user": {
    "username": "usernameTEST",
    "email": "usernameTEST@com",
    "password": "usernameTEST"
  }
};

const draftLoginUser = {
  "user": {
    "email": "usernameTEST@com",
    "password": "usernameTEST"
  }
};

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

  test("'/api/users' post new user", async () => {
    const res = await request(app)
      .post('/api/users')
      .send(draftNewUser)
      .expect(201);
  });
  
  test("'/api/users/login' login user - Error", async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ user: 'user' })
      .expect(422);
  });
  
  test("'/api/user' get user - Error", async () => {
    const res = await request(app)
      .get('/api/user')
      .expect(403)
  });
  
  test("'/api/users/login' login user", async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send(draftLoginUser)
      .expect(200)
  });
  
  test("'/api/user' get user data - status check", async () => {
    const result = await request(app)
      .get('/api/user')
      .expect(403);
  });

  test("auth middleware checking", async () => {
    const req = getMockReq({ headers: { authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lVGVzdCIsImlhdCI6MTY1NTQ4MzE3MX0.zcCk9mQr9nioqQF6QNFXLXa73cSMC_xcDIGbwj1Rdnw' }, user: { username: 'usernameTest' } })
    const result = await request(app)
      .get('/api/user')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lVGVzdCIsImlhdCI6MTY1NTQ4MzE3MX0.zcCk9mQr9nioqQF6QNFXLXa73cSMC_xcDIGbwj1Rdnw')
    expect(result).toBeTruthy();
  });
});


