const { Expense } = require('../models/Expense.model.js');
const userService = require('../services/user.service.js');
const { Sequelize } = require('../db');

const getAll = async () => {
  const result = await Expense.findAll();

  return result;
};

const getById = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  const user = await userService.getById(userId);

  if (!user) {
    return null;
  }

  try {
    return Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      throw Object.assign(new Error('Expense already exists'), { status: 400 });
    }

    throw Object.assign(new Error('Failed to create expense'), { status: 500 });
  }
};

const update = async ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  await Expense.update(
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    },
    {
      where: { id },
    },
  );

  return Expense.findByPk(id);
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
