import mongoose from "mongoose";

const userController = require('../user.controller');

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    () => done());
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

const reqUserControllerMock = {params: { slug: 'slug-111' }, user: { username: 'username' }, body: { user: { username: 'username', email: 'email', password: '1', bio: 'bio'  } } };
const mockResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
  }
};

describe("Check method 'getUser' ", () => {
  test('should return correct value', async () => {
    const result = userController.getUser(reqUserControllerMock, mockResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'updateUser' ", () => {
  test('should return correct value', async () => {
    const result = userController.updateUser(reqUserControllerMock, mockResponse);
    expect(result).toBeInstanceOf(Object);
  });
});


// describe("Check method 'getUser' ", () => {
//   test('should 200 and return correct value', () => {
//       const req = mockRequest();
//       const res = mockResponse();
//       req.user = {
//           username: 'username'
//       }
//       const spy: any = jest.spyOn(userController, 'getUser');
//       userController.getUser(req, res);

//       expect(spy).toHaveBeenCalledTimes(1);
//       expect(spy.mock.calls.length).toBe(1); 
//   });

  //   test('should 200', async () => {
  //     const responseNew = await request(app).get('/api/user');
  //     expect(responseNew.statusCode).toBe(200);
  // });

  //   test('should return 422 and return correct value', () => {
      
  //   let req = mockRequest();
  //   req.user = {
  //         username: 'username'
  //   }
      
  //   req.user.username = null;
  //   const res = mockResponse();

  //   controller.getUser(req, res);
  //  expect(res.send.mock.calls.length).toBe(1);
  // });
// });

// describe("Check method 'updateUser' ", () => {
//   test('should 200 and return correct value', () => {
//       const req = mockRequest();
//       const res = mockResponse();
//       req.user = {
//           username: 'username'
//       }
//       const spy: any = jest.spyOn(userController, 'updateUser');
//       userController.updateUser(req, res);

//       expect(spy).toHaveBeenCalledTimes(1);
//       expect(spy.mock.calls.length).toBe(1); 
//   });

    // test('should return 422 and return correct value', () => {
      
    //   const req = mockRequest();
    //   const res = mockResponse();

    //   req.user = {
    //       username: 'username'
    //   }

    //   req.body.user = {
    //     username: 'username',
    //     email: 'email@com',
    //     bio: 'bio',
    //     image: 'https://image'
    //   }
      
    //   const spy: any = jest.spyOn(controller, 'updateUser');
    //   controller.updateUser(req, res);

    //   expect(spy).toHaveBeenCalledTimes(1);
    // });
// });

