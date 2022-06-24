import Articles from "../../interfaces/article.interface";
import { Users } from "../../interfaces/user.interface";

export const checkFavorite = (user: Users, article: Articles ) => {
    let slugs = [String];
    user.favorites.map((val) => {
        return slugs.push(val.article.slug)
    });
    return slugs.includes(article.slug);
};

export const doFavorite = (user: Users, article: Articles ) => {
    user.favorites.push({ article: article });
    article.favorited = true;
    article.favoritesCount += 1;
};

export const doUnFavorite = (user: Users, article: Articles, slug: string ) => {
    user.favorites = user.favorites.filter((val) => val.article.slug.toString() !== slug);
    article.favorited = false;
    article.favoritesCount -= 1;
};

