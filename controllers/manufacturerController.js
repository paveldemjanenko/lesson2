import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

const getManufacturerFromDB = manufacturerId => {
  const sql = `select * from manufacturer where id = ?`;
  return makeQuery(sql, manufacturerId);
};

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
  const { manufacturerId } = req.params;

  try {
    const sql = 'select * from manufacturer where id = ?';
    const data = await makeQuery(sql, manufacturerId);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const modifyManufacturer = async (req, res, next) => {
  const { manufacturerId } = req.params;

  if (manufacturerId) {
    const data = await getManufacturerFromDB(manufacturerId);

    if (data.length === 0) {
      res.status(404).send('Manufacturer not found');
      return;
    }
  }

  const { body } = req;
  const { title, description, image } = body;

  const sql = `${!manufacturerId ? 'insert into' : 'update'} manufacturer set ? ${
    !manufacturerId ? '' : 'where id= ?'
  }`;

  try {
    const data = await makeQuery(sql, [
      {
        title,
        description,
        image,
      },
      manufacturerId,
    ]);

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const deleteManufacturer = async (req, res, next) => {
  const { manufacturerId } = req.params;

  if (manufacturerId) {
    const data = await getManufacturerFromDB(manufacturerId);

    if (data.length === 0) {
      res.status(404).send('Manufacturer not found');
      return;
    }
  }

  const sql = `delete from manufacturer where id = ?`;
  try {
    const data = await makeQuery(sql, manufacturerId);
    res.status(202).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export { indexAction, getManufacturerById, modifyManufacturer, deleteManufacturer };
