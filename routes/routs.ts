import { Router } from 'express';
import usersRouter from './user.router';
import articlesRouter from './article.router';
import commentsRouter from './comment.router';
import profilesRouter from './profile.router';

const routes = Router();

routes.use(usersRouter);
routes.use(articlesRouter);
routes.use(commentsRouter);
routes.use(profilesRouter);

export default routes;
