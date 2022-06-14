// DOESN'T WORK!

// const controller = require('../controller/user.controller');

// const mockRequest = () => {
//     const req: any = {};
//     req.body = jest.fn().mockReturnValue(req);
//     req.params = jest.fn().mockReturnValue(req);
//     return req;
// };

// const mockResponse = () => {
//     const res: any = {};
//     res.send = jest.fn().mockReturnValue(res);
//     res.status = jest.fn().mockReturnValue(res);
//     return res;
// };

// describe("Check method 'getUser' ", () => {
//   test('should 200 and return correct value', async () => {
//     const req = mockRequest();
//       const res = mockResponse();
//       req.user = {
//           username: 'username'
//       }

//     await controller.getUser(req, res);

    // expect(res.send).toHaveBeenCalledTimes(1)
    // expect(res.send.mock.calls.length).toBe(1);
    // expect(res.status).toHaveBeenCalledWith(200);
//   });

    // test('should return 422 and return correct value', () => {
      
    // let req = mockRequest();
    // req.user = {
    //       username: 'username'
    // }
      
    // req.user.username = null;
//     const res = mockResponse();

//     controller.getUser(req, res);
//    expect(res.send.mock.calls.length).toBe(1);
//   });
// });

