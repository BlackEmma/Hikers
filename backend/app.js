/* eslint-disable import/no-unresolved */
require('@babel/register');
require('dotenv').config();

const express = require('express');

const app = express();

const PORT = process.env.PORT ?? 4000;

const config = require('./config/config');

config(app);

// Подключаем роуты
const authLoginApi = require('./routes/api/authLoginApi');
const mainPageRouterApi = require('./routes/api/mainPageRouterApi');
const placeRouter = require('./routes/api/placeRouter');
const categoryRouter = require('./routes/api/categoryRouter');
const reviewRouter = require('./routes/api/reviewRoute');
const profileRouter = require('./routes/api/profileRouter');
const favouritesRouter = require('./routes/api/favouritesRouter');
const chatRoute = require('./routes/api/chatRoute');
const friendsRouter = require('./routes/api/friendsRouter');

// Подключаем use
app.use('/api', authLoginApi);
app.use('/api', mainPageRouterApi);
app.use('/api', placeRouter);
app.use('/api', categoryRouter);
app.use('/api', reviewRouter);
app.use('/api', profileRouter);
app.use('/api', favouritesRouter);
app.use('/api', chatRoute);
app.use('/api', friendsRouter);

app.listen(PORT, async () => console.log('\x1b[45m%s\x1b[0m', `Server started at ${PORT} port`));
