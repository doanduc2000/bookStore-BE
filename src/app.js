const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const { initDbConnection } = require('./modules/db');

const indexRoute = require('./routes/index');
const key = require('./constants/key');

initDbConnection().catch(() => {
  logger.error('error db connection');
  process.exit(1);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(express.json());
app.set('trust proxy', 1);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: key.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use('/api', indexRoute);

module.exports = app;
