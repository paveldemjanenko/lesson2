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

// FIRST code version of productController
// const getProductById = async (req, res, next) => {
//   logger.log('info', `productCardRoute: ${JSON.stringify(req.params)}`);
//
//   // const productId = { "productId": req.params.productUd }; ES5 way
//   const { productId } = req.params;
//
//   try {
//     const connection = mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       database: process.env.DB_NAME,
//     });
//
//     connection.connect();
//
//     connection.query('SELECT * from products where id = ?', productId, (error, results, fields) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send('Something wrong');
//       }
//
//       if (results) {
//         res.json(results);
//       }
//     });
//
//   } catch (err) {
//     next(new AppError(err.message, 400));
//   }
// };

// export default indexAction;