import mysql from 'mysql';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('categoryController');

const indexAction = async (req, res, next) => {
  logger.log('info', `categoryRoute: ${JSON.stringify(req.params)}`);

  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    connection.connect();

    connection.query('SELECT * from category', null, (error, results, fields) => {
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

const getCategoryById = async (req, res, next) => {
  logger.log('info', `categoryRoute: ${JSON.stringify(req.params)}`);

  const { categoryId } = req.params;

  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    connection.connect();

    connection.query('SELECT * from category', null, (error, results, fields) => {
      if (error) {
        console.log(error);
      }

      if (results) {
        res.json(results[categoryId]);
      }
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { indexAction, getCategoryById };
