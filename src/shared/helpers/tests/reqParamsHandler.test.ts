const reqParamsHandler = require('../reqParamsHandler/reqParamsHandler');
import { requireMock } from '../../mockes/mockes';

describe("Check method 'makeCommentsArray' ", () => {
  test('should return correct value', () => {
    const queryDraft = { taglist: ['tag'] }
    const result = reqParamsHandler.tagHandler(queryDraft, requireMock);
    expect(result).toBe(queryDraft);
  });
});

describe("Check method 'limitOffsetHandler' ", () => {
  test('should return correct value', () => {
    const result = reqParamsHandler.limitOffsetHandler(1, 1, requireMock);
    expect(result).toMatchObject({ "limit": 1, "offset": 1 });
  });
});