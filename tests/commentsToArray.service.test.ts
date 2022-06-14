const serviceComments = require('../shared/services/commentsToArray.service');

const article = { comments: [{comment: 'comment'}] };
const expected = ['comment'];

describe("Check method 'makeCommentsArray' ", () => {
    test('should return correct value', () => {
        const result = serviceComments.makeCommentsArray(article);
        expect(result).toEqual(expect.arrayContaining(expected));
  });
});