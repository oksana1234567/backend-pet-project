const articleEntity = require('../article');
const mockingoose = require('mockingoose');

import Article from '../../models/article.model';
import Articles from '../../shared/interfaces/article.interface';
import { articlesMock, requestMock } from '../../shared/mockes/mockes';

mockingoose(Article).toReturn(articlesMock, 'findOne');

describe("Check method 'getArticleBySlug' of articleEntity", () => {
  test('should return correct value', () => {
    const result = articleEntity.getArticleBySlug(requestMock);
    result.then((res: Articles) => expect(res).toBeInstanceOf(Object));
  });
});

describe("Check method 'getAllArticles' of articleEntity", () => {
  test('should return correct value', () => {
    const result = articleEntity.getAllArticles(requestMock);
    expect(result).toBeInstanceOf(Object);
  });
});
