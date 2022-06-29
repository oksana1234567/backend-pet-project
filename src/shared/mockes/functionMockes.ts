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