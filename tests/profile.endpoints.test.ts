const mongoose = require("mongoose");
const userEntity = require('../src/entities/user');
const profileService = require('../src/services/profile.service');

import request from "supertest";

import app from "../app";
import User from '../src/models/user.model';
import { token, userMock } from '../src/shared/mockes/mockes';

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    { useNewUrlParser: true },
    () => done());

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
    jest.spyOn(userEntity, 'getUserByToken').mockResolvedValue(userMock);
    jest.spyOn(userEntity, 'getUserByName').mockResolvedValue(userMock);
    const result = await request(app)
      .get('/api/profiles/test')
      .set('Authorization', token)
      .expect(200)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('profile');
  });
  

  test("check route '/api/profiles/:username/follow', method 'post' - should follow the profile", async () => {
    jest.spyOn(profileService, 'followProfileService').mockResolvedValue(userMock);
    jest.spyOn(userEntity, 'getUserByName').mockResolvedValue(userMock);
    const result = await request(app)
      .post('/api/profiles/test/follow')
      .set('Authorization', token)
      .expect(200)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('profile');
  });
  
  test("check route '/api/profiles/:username/follow', method 'post' - should not follow the profile - the Error", async () => {
    jest.spyOn(profileService, 'followProfileService').mockResolvedValue(userMock);
    jest.spyOn(userEntity, 'getUserByName').mockRejectedValue(new Error)
    await request(app)
      .post('/api/profiles/Wrong/follow')
      .set('Authorization', token)
      .expect(422)
  });

  test("check route '/api/profiles/:username/follow', method 'delete' - should delete following the profile", async () => {
    jest.spyOn(profileService, 'unFollowProfileService').mockResolvedValue(userMock);
    jest.spyOn(userEntity, 'getUserByName').mockResolvedValue(userMock);
    const result = await request(app)
      .delete('/api/profiles/test/follow')
      .set('Authorization', token)
      .expect(200)
    expect(result.constructor.name).toBe('Response');
    expect(result.text).toMatch('profile');
  });
  
  test("check route '/api/profiles/:username/follow', method 'delete' - should not delete following the profile - the Error", async () => {
    jest.spyOn(profileService, 'unFollowProfileService').mockResolvedValue(userMock);
    jest.spyOn(userEntity, 'getUserByName').mockRejectedValue(new Error)
    await request(app)
      .delete('/api/profiles/Wrong/follow')
      .set('Authorization', token)
      .expect(422)
  });
});

