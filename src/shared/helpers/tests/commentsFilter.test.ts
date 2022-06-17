const commentsFilter = require('../filters/commentsFilter');


const articleDraft = { comments: [{ comment: { author: 'username', id: '111' } }, { comment: { author: 'testuser', id: '112' } }] };
const comments = [{ comment: { id: '111' }}];
const article = { comments: [{comment: 'comment'}] };
const expected = ['comment'];
const paramDraft = { params: {id: '111'} };

describe("Check method 'filterAuthorComments' ", () => {
  test('should return correct value', () => {
    const result = commentsFilter.filterAuthorComments(articleDraft, 'username');
    expect(result).toBeInstanceOf(Array);
  });
});

describe("Check method 'makeCommentsArray' ", () => {
  test('should return correct value', () => {
    const result = commentsFilter.makeCommentsArray(article);
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});

describe("Check method 'filterCommentsToDelete' ", () => {
  test('should return correct value', () => {
    const result = commentsFilter.filterCommentsToDelete(comments, paramDraft);
    expect(result).toBeInstanceOf(Array);
  });
});