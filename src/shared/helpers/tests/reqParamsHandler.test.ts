const reqParamsHandler = require('../reqParamsHandler/reqParamsHandler');
import { requestMock } from '../../mockes/mockes';

describe("Check method 'makeCommentsArray' ", () => {
  test('should return correct value', () => {
    const queryDraft = { taglist: ['tag'] }
    const result = reqParamsHandler.tagHandler(queryDraft, requestMock);
    expect(result).toBe(queryDraft);
  });
});

describe("Check method 'limitHandler' ", () => {
  test('should return correct value', () => {
    const result = reqParamsHandler.limitHandler(requestMock);
    expect(result).toBe(1);
  });
});

describe("Check method 'offsetHandler' ", () => {
  test('should return correct value', () => {
    const result = reqParamsHandler.offsetHandler(requestMock);
    expect(result).toBe(1);
  });
});