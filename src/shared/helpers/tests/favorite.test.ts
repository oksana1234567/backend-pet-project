const helperFavorite = require('../favoriteHandler/favorite');

const draftArticle = { slug: 'slug', favorited: false, favoritesCount: 0 };
const draftUser = { favorites: [{ article: { slug: 'slug' } }] };

describe("Check methods of 'favorite.service' ", () => {
    test('checkFavorite should return correct value', () => {
        const result = helperFavorite.checkFavorite(draftUser, draftArticle);
        expect(result).toBe(true);
    });

    test('manageModelsChangesFavorite should return correct value', () => {
        const result = helperFavorite.manageModelsChangesFavorite(draftUser, draftArticle);
        expect(draftArticle.favorited).toBe(true);
        expect(draftArticle.favoritesCount).toBe(1);
    });
    
    test('manageModelsChangesUnFavorite should return correct value', () => {
        const result = helperFavorite.manageModelsChangesUnFavorite(draftUser, draftArticle);
        expect(draftArticle.favorited).toBe(false);
        expect(draftArticle.favoritesCount).toBeNull;
    });
});