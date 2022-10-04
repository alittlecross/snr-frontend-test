const express = require('express');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');
const session = require('express-session');

const indexRouter = require('./routes/index');
const addressesRouter = require('./routes/addresses');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/govuk-frontend/govuk')));
app.use(express.static(path.join(__dirname, 'node_modules/govuk-frontend/govuk/assets'), { maxAge: 1000 * 60 * 60 * 24 }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'shh',
}));

const appViews = [
  path.join(__dirname, '/node_modules/govuk-frontend/'),
  path.join(__dirname, '/views'),
];

nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
});

app.use(indexRouter);
app.use(addressesRouter);

module.exports = app;
