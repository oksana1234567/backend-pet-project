import Article from "../../models/article.model";
import User from "../../models/user.model";
import { articlesMock, userMock } from "./mockes";
const mockingoose = require('mockingoose');
const articleEntity = require('../../entities/article');
const userEntity = require('../../entities/user');

export const spyOnGetArticleBySlug = () => {
  return jest.spyOn(articleEntity, 'getArticleBySlug')
};

export const spyOnGetUserByName = () => {
  return jest.spyOn(userEntity, 'getUserByName');
};

export const mockArticleModelSave = () => {
  return mockingoose(Article).toReturn(articlesMock, 'save');
};

export const mockUserModelSave = () => {
  mockingoose(User).toReturn(userMock, 'save');
};

export const articleEntityToTest = () => {
  new Article({
    slug: 'test-111',
    title: 'title new',
    description: 'description',
    body: 'body',
    tagList: ['tagList'],
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'username',
      bio: 'bio',
      image: 'image',
      following: false,
    }
  }
  ).save();
};