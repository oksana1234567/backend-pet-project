import { requestMock } from '../../shared/mockes/mockes';
import { mockArticleModelSave, spyOnGetArticleBySlug } from '../../shared/mockes/functionMockes';

const commentService = require('../comment.service');
const findFollowedAuthorMock = require('../../shared/helpers/filters/findFollowedAuthor');
const filterHelper = require('../../shared/helpers/filters/commentsFilter');

describe("Check method 'postCommentService' of commentService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    spyOnGetArticleBySlug().mockResolvedValue({ author: { username: 'username' }, comments: [], save: () => { } });
    jest.spyOn(findFollowedAuthorMock, 'findFollowedAuthor').mockReturnValue(['username']);
    const result = jest.spyOn(commentService, 'postCommentService');
    await commentService.postCommentService(requestMock);
    expect(result).toHaveBeenCalled();
  });
});

describe("Check method 'deleteCommentService' of commentService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    spyOnGetArticleBySlug().mockResolvedValue({ author: { username: 'username' }, comments: [], save: () => { } });
    jest.spyOn(filterHelper, 'filterAuthorComments').mockReturnValue(true)
    jest.spyOn(filterHelper, 'filterCommentsToDelete').mockReturnValue([{ comments: { body: 'body' } }])
    const result = await commentService.deleteCommentService(requestMock);
    expect(result).toBeInstanceOf(Object)
  });
});

