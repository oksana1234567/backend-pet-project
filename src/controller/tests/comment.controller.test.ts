import mongoose from "mongoose";

const commentController = require('../comment.controller');

const reqCommentControllerMock = {query: {favorited: [], author: {username: 'username'}}, params: { slug: 'slug-111', id: 'id' }, user: { username: 'username' }, body: { comment: { body: 'comment' } } };
const mockCommentResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
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

describe("Check method 'postArticle' ", () => {
  test('should return correct value', async () => {
    const result = commentController.postComment(reqCommentControllerMock, mockCommentResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'deleteComment' ", () => {
  test('should return correct value', async () => {
    const result = commentController.deleteComment(reqCommentControllerMock, mockCommentResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'getComments' ", () => {
  test('should return correct value', async () => {
    const result = commentController.getComments(reqCommentControllerMock, mockCommentResponse);
    expect(result).toBeInstanceOf(Object);
  });
});
