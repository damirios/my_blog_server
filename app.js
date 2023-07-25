const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

const userRouter = require('./routers/user-router'); 

app.use(express.json());

// роутеры
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