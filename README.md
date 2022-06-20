# Node/Express/Mongoose - RealWorld API

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [typeScript](https://www.typescriptlang.org/) - For adding optional static typing to the language. It is designed for the development of large applications and transpiles to JavaScript
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [slug](https://github.com/dodo/node-slug) - For encoding titles into a URL-friendly format
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - For storing of passwords as hashed passwords instead of plaintext
- [cors](https://github.com/expressjs/cors) - For providing a Connect/Express middleware that can be used to enable CORS with various options
- [dotenv](https://github.com/motdotla/dotenv) - For loading environment variables from a .env file into process.env
- [nodemon](https://github.com/remy/nodemon) - For automatically restarting the node application when file changes in the directory are detected
- [jest](https://jestjs.io) - For testing JavaScript
- [supertest](https://github.com/visionmedia/supertest) - For HTTP assertions
- [sinon](https://github.com/sinonjs/sinon) - For Spies, Stubs and Mocks,
- [mockingoose](https://github.com/alonronin/mockingoose) - For mongoose mocking

## Application Structure

- `app.ts` - The entry point to an application. This file defines an express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `routes/` - This folder contains the route definitions for API.
- `models/` - This folder contains the schema definitions for Mongoose models.
- `controller/` - This folder contains request and response handling.
- `middleware/` - This folder contains middlewares for controllers.
- `entities/` - This folder contains service for finding entities in database.
- `service/` - This folder contains business logic for Mongoose models changing.
- `shared/` - This folder contains interfaces, helpers and mockes for testing folders.

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT.

## API Documentation

[API] (https://api.realworld.io/api-docs/#/) - Detailed description for API endpoints
