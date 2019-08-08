import express from 'express';
import bodyParser from 'body-parser';
import './utils/dotenv';
import healthCheck from './routes/healthCheck';
import userRoute from './routes/userRoute';
import categoryRoute from './routes/categoryRoute';
import commentsRoute from './routes/commentsRoute';
import manufacturerRoute from './routes/manufacturerRoute';
import orderRoute from './routes/orderRoute';
import productsRoute from './routes/productsRoute';
import homeRoute from './routes/homeRoute';
import defaultErrorHandler from './middlewares/defaultErrorHandler';

const logger = require('./utils/logger')(process.env.APP_NAME);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api/v${process.env.API_VERSION}`, healthCheck);
app.use('/users', userRoute);
app.use('/categories', categoryRoute); // location of the link on browser
app.use('/comments', commentsRoute);
app.use('/manufacturers', manufacturerRoute);
app.use('/orders', orderRoute);
app.use('/products', productsRoute);
app.use('/', homeRoute);

app.use(defaultErrorHandler);

app.listen(process.env.APP_PORT, 'localhost', () => {
  logger.log(
    'info',
    `App is running at http://localhost:${process.env.APP_PORT} in ${app.get('env')} mode.`,
  );
});

module.exports = app;
