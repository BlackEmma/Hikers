const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const fileUpload = require('express-fileupload');

const sessionConfig = require('./sessionConfig');
const ssr = require('../middleware/ssr');

module.exports = function config(app) {
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, '../../frontend')));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(ssr);
  app.use(fileUpload());
};
