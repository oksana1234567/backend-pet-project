const reqParamsHandler = require('../reqParamsHandler/reqParamsHandler');


// const articleDraft = { comments: [{ comment: { author: 'username', id: '111' } }, { comment: { author: 'testuser', id: '112' } }] };
// const comments = [{ comment: { id: '111' }}];
// const article = { comments: [{comment: 'comment'}] };
// const expected = ['comment'];
const reqQueryDrafn = { query: {offset: '1', limit: '1', tag: 'tag'} };
const queryDraft = {taglist: ['tag']}

describe("Check method 'makeCommentsArray' ", () => {
  test('should return correct value', () => {
    const result = reqParamsHandler.tagHandler(queryDraft, reqQueryDrafn);
    // expect(result).toEqual(expect.arrayContaining(expected));
      expect(result).toBe(queryDraft);
  });
});

describe("Check method 'limitOffsetHandler' ", () => {
  test('should return correct value', () => {
    const result = reqParamsHandler.limitOffsetHandler(1, 1, reqQueryDrafn);
    // expect(result).toBeInstanceOf(Array);
      expect(result).toMatchObject({"limit": 1, "offset": 1});
  });
});