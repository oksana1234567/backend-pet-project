const commentController = require('../comment.controller');
const commentService = require('../../services/comment.service');
import { requireMock, responseMock, articlesMock } from '../../shared/mockes/mockes';
import { spyOnGetArticleBySlug } from '../../shared/mockes/functionMockes';

describe("Check method 'postArticle' of commentController", () => {
  test('should return Promise', async () => {
    spyOnGetArticleBySlug().mockResolvedValue(articlesMock[0]);
    const result = commentController.postComment(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    spyOnGetArticleBySlug().mockRejectedValue(new Error)
    const result = commentController.postComment(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'deleteComment'  of commentController", () => {
  test('should return Promise', async () => {
    jest.spyOn(commentService, 'deleteCommentService').mockResolvedValue(articlesMock[0]);
    const result = commentController.deleteComment(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(commentService, 'deleteCommentService').mockRejectedValue(new Error)
    const result = commentController.deleteComment(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getComments'  of commentController", () => {
  test('should return Promise', async () => {
    spyOnGetArticleBySlug().mockResolvedValue(articlesMock[0]);
    const result = commentController.getComments(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    spyOnGetArticleBySlug().mockRejectedValue(new Error)
    const result = commentController.getComments(requireMock, responseMock);
    expect(result.constructor.name).toBe('Promise');
  });
});
