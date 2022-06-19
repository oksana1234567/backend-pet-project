const serviceDate = require('../modelsFieldsHandler/updateDate');

const draft = {updatedAt: 'date'}

describe("Check method 'updateDate' ", () => {
  test('should return correct value', () => {
    const result = serviceDate.updateDate(draft);
    expect(result).toMatch('GMT+0300 (Eastern European Summer Time)');
  });
});