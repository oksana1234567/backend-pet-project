const favoriteHelper = require('../favoriteHandler/favorite');
import { articlesMock, userMock } from '../../mockes/mockes';

describe("Check methods of 'favorite.service' ", () => {
    test('checkFavorite should return correct value', () => {
        const result = favoriteHelper.checkFavorite(userMock, articlesMock[0]);
        expect(result).toBe(true);
    });

    test('manageModelsChangesFavorite should return correct value', () => {
        favoriteHelper.manageModelsChangesFavorite(userMock, articlesMock[0]);
        expect(articlesMock[0].favorited).toBe(true);
        expect(articlesMock[0].favoritesCount).toBe(1);
    });
    
    test('manageModelsChangesUnFavorite should return correct value', () => {
        favoriteHelper.manageModelsChangesUnFavorite(userMock, articlesMock[0]);
        expect(articlesMock[0].favorited).toBe(false);
        expect(articlesMock[0].favoritesCount).toBeNull;
    });
});