// import mongoose from "mongoose";
import Article from "../../models/article.model";
import User from "../../models/user.model";

const mockingoose = require('mockingoose');
const commentService = require('../comment.service');
const articleEntityMock = require('../../entities/article');
const checkIfFollowedAuthorMock = require('../../shared/helpers/filters/checkIfFollowedAuthor');
const filterMock = require('../../shared/helpers/filters/commentsFilter');

const reqCommentMock = {params: { slug: 'slug-111' }, user: { username: 'username', following: [{username: 'username'}] }, body: { comment: { body: 'body' } } };
const commentServiceDraft = { title: 'title', description: 'description', body: 'body', tagList: 'tagList', author: { username: 'username' }, save: () => { }, comments: [{comment: {body: 'body', id: 'id'}}] };
const mockResponse = {
  send: () => { },
  status: function (responseStatus: any) {
    return this;
  }
};
    
describe("Check method 'postCommentService' ", () => {
  test('should return correct value', async () => {
    mockingoose(Article).toReturn(commentServiceDraft, 'save');
    // const spyResult = jest.spyOn(articleEntityMock, 'getArticleBySlug').mockResolvedValue(commentServiceDraft);
    jest.spyOn(checkIfFollowedAuthorMock, 'checkIfFollowedAuthor').mockResolvedValue(commentServiceDraft).mockReturnValue(true);
    const result = jest.spyOn(commentService, 'postCommentService');
    await commentService.postCommentService(reqCommentMock, mockResponse);
    expect(result).toHaveBeenCalled()
  });
});

describe("Check method 'deleteCommentService' ", () => {
  test('should return correct value', async () => {
    mockingoose(Article).toReturn(commentServiceDraft, 'save');
    jest.spyOn(articleEntityMock, 'getArticleBySlug').mockResolvedValue(commentServiceDraft);
    jest.spyOn(filterMock, 'filterAuthorComments').mockReturnValue(true)
    jest.spyOn(filterMock, 'filterCommentsToDelete').mockReturnValue([{ comments: { body: 'body' } }])
    const result = await commentService.deleteCommentService(reqCommentMock, mockResponse);
    expect(result).toBeInstanceOf(Object)
  });

  test('should catch Error', async () => {
    jest.spyOn(articleEntityMock, 'getArticleBySlug').mockRejectedValueOnce(new Error);
    const result = await commentService.deleteCommentService(reqCommentMock, mockResponse);
    expect(result).toBeInstanceOf(Object);
  });
});

