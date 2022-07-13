
export const requestMock = {
    query: {
        favorited: 'username',
        author: {
            username: 'username'
        },
        limit: '1',
        offset: '1',
        tag: 'tag'
    },
    params: {
        slug: 'slug-111',
        username: 'username',
        id: '111'
    },
    user: {
        username: 'username',
        following: [{ username: 'username' }]
    },
    body: {
        article: {
            title: 'test',
            description: 'description',
            body: 'body',
            tagList: 'tagList'
        },
        comment: {
            body: 'comment'
        },
        user: {
            username: 'username',
            email: 'email',
            password: '111111',
            bio: 'bio', 
            image: 'image'
        }
    },
    _conditions: {
        username: 'username'
    },
    headers: {
        authorization: 'Bearer 111111'
    },
    sendAsProfileResult: () => { },
    rawHeaders: ['Authorization']
};

export const responseMock = {
    send: () => { },
    status: function (responseStatus: any) {
        return this;
    }
};

export const articlesMock = [{
    slug: 'slug',
    title: 'title',
    description: 'description',
    body: 'body',
    tagList: 'tagList',
    author: { username: 'username' },
    comments: [{
        comment: {
            body: 'body',
            _id: '111',
            author: 'username',
            id: '111',
        }
    }],
    save: () => { },
    remove: () => { },
    _id: 'id',
    favorited: false,
    favoritesCount: 0
}];

export const userMock = {
    username: 'test',
    email: 'test@com',
    password: 'password',
    bio: 'bio',
    image: 'image',
    favorites: [{ article: { _id: '111', slug: 'slug' } }],
    following: [],
    sendAsProfileResult: () => { },
    save: () => { },
    _conditions: { username: 'test' }
};

export const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lVGVzdCIsImlhdCI6MTY1NTQ4MzE3MX0.zcCk9mQr9nioqQF6QNFXLXa73cSMC_xcDIGbwj1Rdnw'; 

export const newUserMock = {
  user: {
    username: "usernameTEST",
    email: "usernameTEST@com",
    password: "usernameTEST"
  }
};

export const loginUserMock = {
  user: {
    email: "usernameTEST@com",
    password: "usernameTEST"
  }
};