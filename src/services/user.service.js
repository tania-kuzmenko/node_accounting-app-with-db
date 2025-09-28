import { User } from '../models/User.model.js';

export const getAll = async () => {
  const users = await User.findAll();

  return users;
};

export const getById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

export const create = (name) => {
  return User.create({ name });
};

export const update = async ({ id, name }) => {
  await User.update(
    { id, name },
    {
      where: { id },
    },
  );
};

export const remove = async (id) => {
  await User.destroy({ where: { id } });
};
