import { requireMock, responseMock, articlesMock } from '../../shared/mockes/mockes';
import {mockArticleModelSave, spyOnGetArticleBySlug } from '../../shared/mockes/functionMockes'
const commentService = require('../comment.service');
const checkIfFollowedAuthorMock = require('../../shared/helpers/filters/checkIfFollowedAuthor');
const filterHelper = require('../../shared/helpers/filters/commentsFilter');

describe("Check method 'postCommentService' of commentService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    jest.spyOn(checkIfFollowedAuthorMock, 'checkIfFollowedAuthor').mockResolvedValue(articlesMock).mockReturnValue(true);
    const result = jest.spyOn(commentService, 'postCommentService');
    await commentService.postCommentService(requireMock, responseMock);
    expect(result).toHaveBeenCalled()
  });
});

describe("Check method 'deleteCommentService' of commentService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    spyOnGetArticleBySlug().mockResolvedValue(articlesMock);
    jest.spyOn(filterHelper, 'filterAuthorComments').mockReturnValue(true)
    jest.spyOn(filterHelper, 'filterCommentsToDelete').mockReturnValue([{ comments: { body: 'body' } }])
    const result = await commentService.deleteCommentService(requireMock, responseMock);
    expect(result).toBeInstanceOf(Object)
  });

  test('should catch Error', async () => {
    spyOnGetArticleBySlug().mockRejectedValueOnce(new Error);
    const result = await commentService.deleteCommentService(requireMock, responseMock);
    expect(result).toBeInstanceOf(Object);
  });
});

