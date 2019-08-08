import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

const logger = require('../utils/logger')('homeController');

const indexAction = async (req, res, next) => {
  logger.log('info', `homeRoute: ${JSON.stringify(req.params)}`);

  try {
    const sql = 'select * from products';
    const data = await makeQuery(sql);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export default indexAction;
