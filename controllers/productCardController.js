import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

const indexAction = async (req, res, next) => {
  try {
    const sql = 'select * from products';
    const data = await makeQuery(sql);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getProductById = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const sql = 'select * from products where id = ?';
    const data = await makeQuery(sql, productId);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewProduct = async (req, res, next) => {
  const { body } = req;
  const {
    title,
    image,
    description,
    price,
    amount,
    category_id,
    rate,
    vote,
    discount,
    manufacturer_id,
  } = body;

  const sql = `insert into products set ?`;

  try {
    const data = await makeQuery(sql, {
      title,
      image,
      description,
      price,
      amount,
      category_id,
      rate,
      vote,
      discount,
      manufacturer_id,
    });

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export { indexAction, getProductById, addNewProduct };

//
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
