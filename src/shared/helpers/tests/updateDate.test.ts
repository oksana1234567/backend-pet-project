const dateHelper = require('../modelsFieldsHandler/updateDate');

describe("Check method 'updateDate' ", () => {
  test('should return correct value', () => {
    const draft = { updatedAt: 'date' };
    const result = dateHelper.updateDate(draft);
    expect(result).toMatch('GMT+0300 (Eastern European Summer Time)');
  });
});