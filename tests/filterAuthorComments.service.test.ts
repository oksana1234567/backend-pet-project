const serviceFilter = require('../shared/services/filterAuthorComments.service');

const articleDraft = { comments: [{comment: {author: 'username'}}, {comment: {author: 'testuser'}}] };
describe("Check method 'filterAuthorComments' ", () => {
    test('should return correct value', () => {
        const result = serviceFilter.filterAuthorComments(articleDraft, 'username');
        expect(result).toBeTruthy;
  });
});
