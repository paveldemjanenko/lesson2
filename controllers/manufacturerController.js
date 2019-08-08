import mysql from 'mysql';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('manufacturerController');

const indexAction = async (req, res, next) => {
  logger.log('info', `manufacturerRoute: ${JSON.stringify(req.params)}`);

  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    connection.connect();

    connection.query('SELECT * from manufacturer', null, (error, results, fields) => {
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

const getManufacturerById = async (req, res, next) => {
  logger.log('info', `manufacturerRoute: ${JSON.stringify(req.params)}`);

  const { manufacturerId } = req.params;

  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    connection.connect();

    connection.query('SELECT * from manufacturer', null, (error, results, fields) => {
      if (error) {
        console.log(error);
      }

      if (results) {
        res.json(results[manufacturerId]);
      }
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { indexAction, getManufacturerById };
