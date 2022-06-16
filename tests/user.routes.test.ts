
import request from "supertest";
const mongoose = require("mongoose");
import app from "../app";

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

// beforeAll((done) => {
//   mongoose.connect('mongodb://localhost:27017/JestDB',
//     () => done());
// });

// afterAll((done) => {
//   mongoose.connection.db.dropDatabase(() => {
//     mongoose.connection.close(() => done())
//   });
// });

describe("User route testing: ", () => {

    test("'/api/users' post new user", async ()  => {
      const res = await request(app)
        .post('/api/users')
        .send(draftNewUser)
        .expect(201);
    });
  
  test("'/api/users/login' login user - Error", async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({user: 'user'})
        .expect(422);
  });
  
    // test("'/api/users' update - Error", async () => {
    //   const res = await request(app)
    //     .put('/api/users')
    //     .send({user: 'user'})
    //     .expect(404);
    // });
  
    test("'/api/user' get user - Error", async ()  => {
      const res = await request(app)
        .get('/api/user')
        .expect(403)
    });
  
    test("'/api/articles' - Error", async ()  => {
      const res = await request(app)
        .post('/api/articles')
        .expect(500)
    });
  
      test("'/api/users/login' login user", async ()  => {
        const res = await request(app)
          .post('/api/users/login')
          .send(draftLoginUser)
          .expect(200)
      });
  
    //   test("'/api/user' get user data - status check", async ()  => {
    //     const res = await request(app).get('/api/user').set('Authorization', 'Token ' + '1234');
    //     expect(res.status).toBe(200);
        
    //     const resError = await request(app).get('/api/user');
    //     expect(resError.status).toBe(401);
    // });
});


// router.route('/user').all(verifyAuthorization).get(getUser);
// router.route('/users').all(checkUserExists).post(signUp);
// router.route('/users/login').post(signIn);
// router.route('/user').all(verifyAuthorization).put(updateUser);