import slug from 'slug';

export const slugify = function (title: string) {
    return slug(title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};