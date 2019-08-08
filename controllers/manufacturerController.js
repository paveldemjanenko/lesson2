import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

const indexAction = async (req, res, next) => {
  try {
    const sql = 'select * from manufacturer';
    const data = await makeQuery(sql);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getManufacturerById = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const sql = 'select * from manufacturer where id = ?';
    const data = await makeQuery(sql, productId);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewManufacturer = async (req, res, next) => {
  const { body } = req;
  const {
    title,
    description,
    image,
  } = body;

  const sql = `insert into manufacturer set ?`;

  try {
    const data = await makeQuery(sql, {
      title,
      description,
      image,
    });

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export { indexAction, getManufacturerById, addNewManufacturer };