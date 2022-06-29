const reqParamsHandler = require('../reqParamsHandler/reqParamsHandler');
import { requestMock } from '../../mockes/mockes';

describe("Check method 'makeCommentsArray' ", () => {
  test('should return correct value', () => {
    const queryDraft = { taglist: ['tag'] }
    const result = reqParamsHandler.tagHandler(queryDraft, requestMock);
    expect(result).toBe(queryDraft);
  });
});

describe("Check method 'limitOffsetHandler' ", () => {
  test('should return correct value', () => {
    const result = reqParamsHandler.limitOffsetHandler(1, 1, requestMock);
    expect(result).toMatchObject({ "limit": 1, "offset": 1 });
  });
});