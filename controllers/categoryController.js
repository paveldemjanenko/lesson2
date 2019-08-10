import AppError from '../errors/AppError';
import makeQuery from '../service/MysqlConnection';

const getCategoryFromDB = categoryId => {
  const sql = `select * from category where id = ?`;
  return makeQuery(sql, categoryId);
};

const indexAction = async (req, res, next) => {
  try {
    const sql = 'select * from category';
    const data = await makeQuery(sql);

    res.json(data);
  } catch (err) {
    next(new AppError(err.meddage, 400));
  }
};

const getCategoryById = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const sql = 'select * from category where id = ?';
    const data = await makeQuery(sql, categoryId);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const modifyCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  if (categoryId) {
    const data = await getCategoryFromDB(categoryId);

    if (data.length === 0) {
      res.status(404).send('Category not found');
      return;
    }
  }

  const { body } = req;
  const { title, description, category_id } = body;

  const sql = `${!categoryId ? 'insert into' : 'update'} category set ? ${
    !categoryId ? '' : 'where id = ?'
  }`;

  try {
    const data = await makeQuery(sql, [{
      title,
      description,
      category_id,
    },
      categoryId
    ]);

    res.status(201).send(data);
  } catch (err) {
    next(new AppError(error.message, 400));
  }
};

const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  if (categoryId) {
    const data = await getCategoryFromDB(categoryId);

    if (data.length === 0) {
      res.status(404).send('Category not found');
      return;
    }
  }

  const sql = `delete from category where id = ?`;
  try {
    const data = await makeQuery(sql, categoryId);
    res.status(202).send(data);
  } catch (error) {
    next(new AppError(error.message, 404));
  }
};

export { indexAction, getCategoryById, modifyCategory, deleteCategory };
