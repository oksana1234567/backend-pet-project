const articleEntity = require('../article');
const mockingoose = require('mockingoose');
import Article from '../../models/article.model';
import { articlesMock, requireMock } from '../../shared/mockes/mockes';

mockingoose(Article).toReturn(articlesMock, 'findOne');

describe("Check method 'getArticleBySlug' of articleEntity", () => {
  test('should return correct value', () => {
    const result = articleEntity.getArticleBySlug(requireMock);
    result.then((res: Object) => expect(res).toBeInstanceOf(Object));
  });
});

describe("Check method 'getAllArticles' of articleEntity", () => {
  test('should return correct value', () => {
    const result = articleEntity.getAllArticles(requireMock);
    expect(result).toBeInstanceOf(Object);
  });
});

describe("Check method 'getArticlesForFeed' of articleEntity", () => {
  test('should return correct value', () => {
    const result = articleEntity.getArticlesForFeed(requireMock);
    expect(result).toBeInstanceOf(Object);
  });
});