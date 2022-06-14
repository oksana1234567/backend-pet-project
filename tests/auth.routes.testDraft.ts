// DOESN'T WORK!


// import { NextFunction } from "express";
// import request from "supertest";
// const mongoose = require("mongoose");
// const sinon = require('sinon');

// const authenticationMiddleware = require('../middleware/authorization.middlware');
//  sinon.stub(authenticationMiddleware, 'verifyAuthorization')
//       .callsFake(async (req: Request, res: Response, next: NextFunction) => { return next() });


// import app from "../app";

// beforeAll((done) => {
//   mongoose.connect('mongodb://localhost:27017/JestDB',
//     () => done());
// });

// afterAll((done) => {
//   mongoose.connection.db.dropDatabase(() => {
//     mongoose.connection.close(() => done())
//   });
// });

// describe("User route testing: ", () => {  
//   test("'/api/user' get user data - status check", async () => {
//     const res = await request(app).get('/api/user');
//         expect(res.status).toBe(200);
        
//         const resError = await request(app).get('/api/user');
//         expect(resError.status).toBe(401); 
//     });

// });