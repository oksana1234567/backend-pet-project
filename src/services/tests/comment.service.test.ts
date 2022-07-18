import { requestMock } from '../../shared/mockes/mockes';
import { mockArticleModelSave, spyOnGetArticleBySlug, spyOnGetUserByToken } from '../../shared/mockes/functionMockes';
import Articles from '../../shared/interfaces/article.interface';

const commentService = require('../comment.service');
const findFollowedAuthorMock = require('../../shared/helpers/filters/findFollowedAuthor');
const filterHelper = require('../../shared/helpers/filters/commentsFilter');

describe("Check method 'postCommentService' of commentService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    spyOnGetArticleBySlug().mockResolvedValue({ author: { username: 'username' }, comments: [], save: () => { } });
    spyOnGetUserByToken().mockResolvedValue({ save: () => { } });
    jest.spyOn(findFollowedAuthorMock, 'findFollowedAuthor').mockReturnValue(['username']);
    jest.spyOn(commentService, 'postCommentService');
    const result = commentService.postCommentService(requestMock);
    expect(result.constructor.name).toBe('Promise');
  });
});

describe("Check method 'deleteCommentService' of commentService", () => {
  test('should return correct value', async () => {
    mockArticleModelSave();
    spyOnGetArticleBySlug().mockResolvedValue({ author: { username: 'username' }, comments: [], save: () => { } });
    spyOnGetUserByToken().mockResolvedValue({ save: () => { } });
    jest.spyOn(filterHelper, 'filterAuthorComments').mockReturnValue(true)
    jest.spyOn(filterHelper, 'filterCommentsToDelete').mockReturnValue([{ comments: { body: 'body' } }])
    const result = commentService.deleteCommentService(requestMock);
    expect(result.constructor.name).toBe('Promise');
    result.then((res: Articles) => {
      expect(res.comments).toBeInstanceOf(Array);
    });
  });
});