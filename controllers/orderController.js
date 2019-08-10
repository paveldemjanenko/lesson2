import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

const getOrderFromDB = orderId => {
  const sql = 'select * from orders where id = ?';
  return makeQuery(sql, orderId);
};

const indexAction = async (req, res, next) => {
  try {
    const sql = 'select * from orders';
    const data = await makeQuery(sql);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getOrderById = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const sql = 'select * from orders where id = ?';
    const data = await makeQuery(sql, orderId);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const modifyOrder = async (req, res, next) => {
  const { orderId } = req.params;
  if (orderId) {
    const data = await getOrderFromDB(orderId);

    if (data.length === 0) {
      res.status(400).send('Order not found');
      return;
    }
  }

  const { body } = req;
  const {
    sum,
    user_id
  } = body;

  const sql = `${!orderId ? 'insert into' : 'update'} orders set ? ${
    !orderId ? '' : 'where id = ?'
  }`;

  try {
    const data = await makeQuery(sql, [{
      sum,
      user_id,
    },
    orderId,
    ]);

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const deleteOrder = async (req, res, next) => {
  const { orderId } = req.params;
  if (orderId) {
    const data = await getOrderFromDB(orderId);

    if (data.length === 0) {
      res.status(400).send('Order not found');
      return;
    }
  }

  const sql = `delete from orders where id = ?`;
  try {
    const data = await makeQuery(sql, orderId);
    res.status(202).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export { indexAction, getOrderById, modifyOrder, deleteOrder };
