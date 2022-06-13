require('dotenv').config();
const db = require('./models');
import cors from 'cors';
import express from 'express';
import { Request, Response, NextFunction } from "express";
import ArticleRoutes from './routes/article.router';
import CommentRoutes from './routes/comment.router';
import ProfileRoutes from './routes/profile.router';
import UserRoutes from './routes/user.router';

const server_port = process.env.SERVER_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // res.header(
    //     "Access-Control-Allow-Headers",
    //     "Authorization, Origin, Content-Type, Accept, X-Requested-With"
    // );
    next();
});

app.use('/api', UserRoutes);
app.use('/api', ArticleRoutes);
app.use('/api', CommentRoutes);
app.use('/api', ProfileRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

db.mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`).then(() => {
    console.log(`Successfully connected to MongoDB port: ${process.env.MONGO_PORT}`)
}).catch((err: Error) => console.log(`Failed connected to MongoDB port: ${process.env.MONGO_PORT}`, err));

app.listen(server_port, () => {
    console.log('Server running on port: ' + server_port);
});

export default app;