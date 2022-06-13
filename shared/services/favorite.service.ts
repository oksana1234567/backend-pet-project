import IArticle from "../../interfaces/article.interface";
import { IUser } from "../../interfaces/user.interface";

export const checkFavorite = function (user: IUser, article: IArticle ) {
    let slugs = [String];
    user.favorites.map((val) => {
        return slugs.push(val.article.slug)
    });
    return slugs.includes(article.slug);
};

export const manageModelsChangesFavorite = function (user: IUser, article: IArticle ) {
    user.favorites.push({ article: article });
    article.favorited = true;
    article.favoritesCount += 1;
};

export const manageModelsChangesUnFavorite = function (user: IUser, article: IArticle, slug: string ) {
    user.favorites = user.favorites.filter((val) => val.article.slug !== slug);
    article.favorited = false;
    article.favoritesCount -= 1;
};

