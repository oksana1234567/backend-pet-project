// DOESN'T WORK!

// import { NextFunction, Request, Response } from 'express';
// import { verifyAuthorization } from '../middleware/authorization.middlware';

// describe('Authorization middleware', () => {
//     let mockRequest: Partial<Request>;
//     let mockResponse: Partial<Response>;
//     let nextFunction: NextFunction = jest.fn();

//     beforeEach(() => {
//         mockRequest = {};
//         mockResponse = {
//             json: jest.fn()
//         };
//     });

    // test('without "authorization" header', async () => {
    //     const expectedResponse = {
    //         "error": "unathorized"
    //     };
    //     mockRequest = {
    //         headers: {
    //         }
    //     }
    //     verifyAuthorization(mockRequest as Request, mockResponse as Response, nextFunction);

    //     expect(mockResponse.json).toBeCalledWith(expectedResponse);
    // });

    // test('with "authorization" header',  (done) => {
    //     mockRequest = {
    //         headers: {
    //             'Authorization': 'Bearer Token'
    //         }
    //     }
    //     verifyAuthorization(mockRequest as Request, mockResponse as Response, nextFunction);

    //     expect(nextFunction).toBeCalledTimes(1);
    //     done();
    // });

//     test('should resolve with false for invalid token', async () => {
//         mockRequest = {
//             headers: {
//                 'Authorization': 'Bearer abc'
//             }
//         };
//     const response = await verifyAuthorization(mockRequest as Request, mockResponse as Response, nextFunction)
//     expect(response!.status).toEqual({error: {type: 'unauthorized', message: 'Authentication Failed'}})
//   })
// });