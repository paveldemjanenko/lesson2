import express from 'express';
import bodyParser from 'body-parser';
import './utils/dotenv';
import healthCheck from './routes/healthCheck';
import userRoute from './routes/userRoute';
import categoryRoute from './routes/categoryRoute';
import commentsRoute from './routes/commentsRoute';
import manufacturerRoute from './routes/manufacturerRoute';
import orderRoute from './routes/orderRoute';
import productCardRoute from './routes/productCardRoute';
import defaultErrorHandler from './middlewares/defaultErrorHandler';

const logger = require('./utils/logger')(process.env.APP_NAME);

// console.log(process.env.USER_NAME);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api/v${process.env.API_VERSION}`, healthCheck);
app.use('/', userRoute);
app.use('/', categoryRoute);
app.use('/', commentsRoute);
app.use('/', manufacturerRoute);
app.use('/', orderRoute);
app.use('/', productCardRoute);


app.use(defaultErrorHandler);

app.listen(process.env.APP_PORT, 'localhost', () => {
  logger.log(
    'info',
    `App is running at http://localhost:${process.env.APP_PORT} in ${app.get('env')} mode.`,
  );
});

module.exports = app;
