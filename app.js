const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

const userRouter = require('./routers/user-router'); 
const commentRouter = require('./routers/comment-router');

app.use(express.json());

// роутеры
app.use('/user/:userId/comment', (req, res, next) => {
    req.userId = req.params.userId;
    next();
}, commentRouter);

app.use('/blog/:articleId/comment', (req, res, next) => {
    req.articleId = req.params.articleId;
    next();
}, commentRouter);

app.use('/portfolio/:projectId/comment', (req, res, next) => {
    req.projectId = req.params.projectId;
    next();
}, commentRouter);

app.use('/user', userRouter);

async function start() {
    try {
        const db = await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log('error: ', error);
    }
}

start();