import mongoose from 'mongoose';
import * as User from './user.model';
import * as Article from './article.model';

let db = { mongoose: mongoose, user: User, article: Article };
db.mongoose = mongoose;

db.user = User;
db.article = Article;

module.exports = db;