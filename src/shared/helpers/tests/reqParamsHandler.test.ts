const reqParamsHandler = require('../reqParamsHandler/reqParamsHandler');

const reqQueryDrafn = { query: {offset: '1', limit: '1', tag: 'tag'} };
const queryDraft = {taglist: ['tag']}

describe("Check method 'makeCommentsArray' ", () => {
  test('should return correct value', () => {
    const result = reqParamsHandler.tagHandler(queryDraft, reqQueryDrafn);
    expect(result).toBe(queryDraft);
  });
});

describe("Check method 'limitOffsetHandler' ", () => {
  test('should return correct value', () => {
    const result = reqParamsHandler.limitOffsetHandler(1, 1, reqQueryDrafn);
    expect(result).toMatchObject({ "limit": 1, "offset": 1 });
  });
});