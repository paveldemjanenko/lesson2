import mysql from 'mysql';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('commentsController');

const indexAction = async (req, res, next) => {
  logger.log('info', `userRoute: ${JSON.stringify(req.params)}`);

  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    connection.connect();

    connection.query('SELECT * from comments', null, (error, results, fields) => {
      if (error) {
        console.log(error);
      }

      if (results) {
        res.json(results);
      }
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCommentById = async (req, res, next) => {
  logger.log('info', `userRoute: ${JSON.stringify(req.params)}`);

  const { commentId } = req.params;

  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    connection.connect();

    connection.query('SELECT * from comments', null, (error, results, fields) => {
      if (error) {
        console.log(error);
      }

      if (results) {
        res.json(results[commentId]);
      }
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { indexAction, getCommentById };
