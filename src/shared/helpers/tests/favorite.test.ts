const favoriteHelper = require('../favoriteHandler/favorite');
import { articlesMock, userMock } from '../../mockes/mockes';

describe("Check methods of 'favorite.service' ", () => {
    test('checkFavorite should return correct value', () => {
        const result = favoriteHelper.checkFavorite(userMock, articlesMock[0]);
        expect(result).toBe(true);
    });

    test('doFavorite should return correct value', () => {
        favoriteHelper.doFavorite(userMock, articlesMock[0]);
        expect(articlesMock[0].favorited).toBe(true);
        expect(articlesMock[0].favoritesCount).toBe(1);
    });
    
    test('doUnFavorite should return correct value', () => {
        favoriteHelper.doUnFavorite(userMock, articlesMock[0]);
        expect(articlesMock[0].favorited).toBe(false);
        expect(articlesMock[0].favoritesCount).toBeNull;
    });
});