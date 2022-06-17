import mongoose from "mongoose";
import Article from "../../models/article.model";
import User from "../../models/user.model";

const commentService = require('../comment.service');

const reqCommentMock = {params: { slug: 'slug-111' }, user: { username: 'username', following: [{username: 'username'}] }, body: { comment: { body: 'body' } } };

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    () => done());
  
    new Article({
    slug: 'slug-111',
    title: 'title',
    description: 'description',
    body: 'body',
    tagList: ['tagList'],
    createdAt: new Date(),
    updatedAt: new Date(),
    favorited: false,
    favoritesCount: 0,
    author: {
      username: 'username',
      bio: 'bio',
      image: 'image',
      following: [{user: {username: 'username'}}]
    }
  }
  ).save();
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});
    
describe("Check method 'postCommentService' ", () => {
  test('should return correct value', async () => {
    const result = await commentService.postCommentService(reqCommentMock);
    expect(result).toBeInstanceOf(Object)
  });
});

describe("Check method 'deleteCommentService' ", () => {
  test('should return correct value', async () => {
    const result = await commentService.deleteCommentService(reqCommentMock);
    expect(result).toBeInstanceOf(Object)
  });
});

