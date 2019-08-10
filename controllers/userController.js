import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

const getUserFromDB = userId => {
  const sql = 'select * from user where id = ?';
  return makeQuery(sql, userId);
};

const indexAction = async (req, res, next) => {
  try {
    const sql = 'select * from user';
    const data = await makeQuery(sql);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const sql = 'select * from user where id = ?';
    const data = await makeQuery(sql, userId);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const modifyUser = async (req, res, next) => {
  const { userId } = req.params;
  if (userId) {
    const data = await getUserFromDB(userId);
    if (data.length === 0) {
      res.status(404).send('User not found');
      return;
    }
  }

  const { body } = req;
  const {
    first_name,
    last_name,
    password,
    email,
    is_active,
    last_visited
  } = body;

  const sql = `${!userId ? 'insert into' : 'update'} user set ? ${
    !userId ? '' : 'where id = ?'}`;

  try {
    const data = await makeQuery(sql, [{
      first_name,
      last_name,
      password,
      email,
      is_active,
      last_visited,
    },
    userId,
    ]);

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  if (userId) {
    const data = await getUserFromDB(userId);

    if (data.length === 0) {
      res.status(404).send('User not found');
      return;
    }
  }

  const sql = `delete from user where id = ?`;
  try {
    const data = await makeQuery(sql, userId);
    res.status(202).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export { indexAction, getUserById, modifyUser, deleteUser };
