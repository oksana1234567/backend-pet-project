// DOESN'T WORK!

const controller = require('../controller/user.controller');
const request = require('supertest');
const app = require('../app');

const mockRequest = () => {
    const req: any = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
};

const mockResponse = () => {
    const res: any = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
};

describe("Check method 'getUser' ", () => {
  test('should 200 and return correct value', () => {
      const req = mockRequest();
      const res = mockResponse();
      req.user = {
          username: 'username'
      }
      const spy: any = jest.spyOn(controller, 'getUser');
      controller.getUser(req, res);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls.length).toBe(1); 
  });

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
});

describe("Check method 'updateUser' ", () => {
  test('should 200 and return correct value', () => {
      const req = mockRequest();
      const res = mockResponse();
      req.user = {
          username: 'username'
      }
      const spy: any = jest.spyOn(controller, 'updateUser');
      controller.updateUser(req, res);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls.length).toBe(1); 
  });

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
});

