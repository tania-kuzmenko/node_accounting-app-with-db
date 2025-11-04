const User = require('../models/User.model.js');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const create = (name) => {
  return User.create({ name });
};

const update = async ({ id, name }) => {
  await User.update(
    { id, name },
    {
      where: { id },
    },
  );
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
