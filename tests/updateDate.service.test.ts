const serviceDate = require('../shared/services/updateDate.service');

const draft = {updatedAt: 'date'}

describe("Check method 'updateDate' ", () => {
    test('should return correct value', () => {
        const result = serviceDate.updateDate(draft);
        expect(result).toBeInstanceOf(Date);
  });
});