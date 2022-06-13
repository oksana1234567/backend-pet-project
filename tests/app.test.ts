const app = require("../app");
// const mongoose = require("mongoose");
// const supertest = require("supertest");
// const request = require("supertest");

// import app from "../app";
// import * as request from "supertest";

// beforeEach((done) => {
//   mongoose.connect("mongodb://localhost:27017/project",
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => done());
// });

// afterEach((done) => {
//   mongoose.connection.db.dropDatabase(() => {
//     mongoose.connection.close(() => done())
//   });
// });

// describe('Sanity test', () => { 
//   test('1 should equal 1', () => { 
//     expect(1).toBe(1) 
//   })
// })  
// describe("GET / - a simple api endpoint", () => {
//   it("Hello API Request", async () => {
//     const result = await request(app).get("/");
//     expect(result.text).toEqual("hello");
//     expect(result.statusCode).toEqual(200);
//   });
// });

const request = require("supertest");
import { Response } from "express";

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});