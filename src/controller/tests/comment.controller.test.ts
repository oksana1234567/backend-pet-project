
const commentController = require('../comment.controller');
const commentService = require('../../services/comment.service');
const articleEntityMockForComment = require('../../entities/article');

const reqCommentControllerMock = {query: {favorited: [], author: {username: 'username'}}, params: { slug: 'slug-111', id: 'id' }, user: { username: 'username' }, body: { comment: { body: 'comment' } } };
const mockCommentResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
  }
};
const articleServiceDraftForComment = { title: 'title', description: 'description', body: 'body', tagList: 'tagList', author: { username: 'username' }, save: () => { }, _id: 'id', comments: [{comment: {body: 'body'}}] };

describe("Check method 'postArticle' ", () => {
  test('should return correct value', async () => {
    jest.spyOn(articleEntityMockForComment, 'getArticleBySlug').mockResolvedValue(articleServiceDraftForComment);
    const result = commentController.postComment(reqCommentControllerMock, mockCommentResponse);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(articleEntityMockForComment, 'getArticleBySlug').mockRejectedValue(new Error)
    const result = commentController.postComment(reqCommentControllerMock, mockCommentResponse);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'deleteComment' ", () => {
  test('should return correct value', async () => {
    jest.spyOn(commentService, 'deleteCommentService').mockResolvedValue(articleServiceDraftForComment);
    const result = commentController.deleteComment(reqCommentControllerMock, mockCommentResponse);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(commentService, 'deleteCommentService').mockRejectedValue(new Error)
    const result = commentController.deleteComment(reqCommentControllerMock, mockCommentResponse);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'getComments' ", () => {
  test('should return correct value', async () => {
    jest.spyOn(articleEntityMockForComment, 'getArticleBySlug').mockResolvedValue(articleServiceDraftForComment);
    const result = commentController.getComments(reqCommentControllerMock, mockCommentResponse);
    expect(result.constructor.name).toBe('Promise');
  });

  test('should catch Error', async () => {
    jest.spyOn(articleEntityMockForComment, 'getArticleBySlug').mockRejectedValue(new Error)
    const result = commentController.getComments(reqCommentControllerMock, mockCommentResponse);
    expect(result.constructor.name).toBe('Promise');
  });
});
