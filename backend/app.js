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
const placeRouter = require('./routes/api/placeRouter');
const categoryRouter = require('./routes/api/categoryRouter');
const reviewRouter = require('./routes/api/reviewRoute');
const profileRouter = require('./routes/api/profileRouter');
const favouritesRouter = require('./routes/api/favouritesRouter');

// Подключаем use
app.use('/api', authLoginApi);
app.use('/api', placeRouter);
app.use('/api', categoryRouter);
app.use('/api', reviewRouter);
app.use('/api', profileRouter);
app.use('/api', favouritesRouter);

app.listen(PORT, async () => console.log('\x1b[45m%s\x1b[0m', `Server started at ${PORT} port`));
