import { Expense } from '../models/Expense.model.js';
import * as  userService  from '../services/user.service.js';

export const getAll = async () => {
  const result = await Expense.findAll();

  return result;
};

export const getById = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

export const create = ({ userId, spentAt, title, amount, category, note }) => {
  const user = userService.getById(userId);

  if (!user) {
    return null;
  }

  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

export const update = async ({
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
};

export const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

// const reset = async () => {
//   await sequelize.query(`DELETE FROM expenses`, {
//     type: sequelize.QueryTypes.bulkDelete,
//   });
// };
