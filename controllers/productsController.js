import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

const getProductFromDB = productId => {
  const sql = 'select * from products where id = ?';
  return makeQuery(sql, productId);
};

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
    const data = await getProductFromDB(productId);
    // const sql = 'select * from products where id = ?';
    // const data = await makeQuery(sql, productId);
    if (data.length === 0) {
      res.status(404).send('Page not found');
      return;
    }
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const modifyProduct = async (req, res, next) => {
  const { productId } = req.params;
  if (productId) {
    const data = await getProductFromDB(productId);
    if (data.length === 0) {
      res.status(404).send('Product not found');
      return;
    }
  }

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

  const sql = `${!productId ? 'insert into' : 'update'} products set ? ${
    !productId ? '' : 'where id = ?'
  }`;

  // let sql;
  // if (productId) {
  //   sql = `update products set ? where id = ?`;
  // } else {
  //   sql = `insert into product set ?`;
  // }

  try {
    const data = await makeQuery(sql, [
      {
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
      },
      productId,
    ]);

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const deleteProduct = async (req, res, next) => {
  const {productId} = req.params;

  if (productId) {
    const data = await getProductFromDB(productId);

    if (data.length === 0) {
      res.status(404).send('Product not found');
      return;
    }
  }

  const sql = `delete from products where id = ?`;
  try {
    const data = await makeQuery(sql, productId);
    res.status(202).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export { indexAction, getProductById, modifyProduct, deleteProduct };
