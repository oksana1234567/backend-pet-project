const commentsFilterHelper = require('../filters/commentsFilter');
import { articlesMock, requireMock } from '../../mockes/mockes';

describe("Check method 'filterAuthorComments' ", () => {
  test('should return correct value', () => {
    const result = commentsFilterHelper.filterAuthorComments({ comments: articlesMock[0].comments }, 'username');
    expect(result).toBeInstanceOf(Array);
  });
});

describe("Check method 'makeCommentsArray' ", () => {
  test('should return correct value', () => {
    const expected = [{ _id: "111", author: "username", body: "body", id: "111" }];
    const result = commentsFilterHelper.makeCommentsArray({ comments: articlesMock[0].comments });
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});

describe("Check method 'filterCommentsToDelete' ", () => {
  test('should return correct value', () => {
    const result = commentsFilterHelper.filterCommentsToDelete(articlesMock[0].comments, requireMock);
    expect(result).toBeInstanceOf(Array);
  });
});