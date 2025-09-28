import { Category } from '../models/Category.model.js';

export const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

export const getById = async (id) => {
  const category = await Category.findByPk(id);

  return category;
};

export const create = (name) => {
  return Category.create({ name });
};

export const update = async ({ id, name }) => {
  await Category.update(
    { name },
    {
      where: { id },
    },
  );

  const updatedCategory = await getById(id);
  return updatedCategory;
};

export const remove = async (id) => {
  await Category.destroy({ where: { id } });
};
