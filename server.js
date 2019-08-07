import express from 'express';
import bodyParser from 'body-parser';
import './utils/dotenv';
import healthCheck from './routes/healthCheck';
import HomeRoute from './routes/HomeRoute';
import defaultErrorHandler from './middlewares/defaultErrorHandler';

const logger = require('./utils/logger')(process.env.APP_NAME);

// console.log(process.env.USER_NAME);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api/v${process.env.API_VERSION}`, healthCheck);
app.use('/', HomeRoute);

app.use(defaultErrorHandler);

//toto

app.listen(process.env.APP_PORT, 'localhost', () => {
  logger.log(
    'info',
    `App is running at http://localhost:${process.env.APP_PORT} in ${app.get('env')} mode.`,
  );
});

module.exports = app;
