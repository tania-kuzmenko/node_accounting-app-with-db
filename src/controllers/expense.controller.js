import * as  expenseService from '../services/expense.service.js';
import * as userService from '../services/user.service.js';

export const get = async (req, res) => {
  let result = await expenseService.getAll();
  const { userId, categories, from, to } = req.query;

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (categories) {
    const cats = Array.isArray(categories) ? categories : [categories];

    result = result.filter((e) => cats.includes(e.category));
  }

  if (from) {
    const fromDate = new Date(from);

    result = result.filter((e) => new Date(e.spentAt) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);

    result = result.filter((e) => new Date(e.spentAt) <= toDate);
  }

  res.send(result);
};

export const getOne = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }
  res.send(expense);
};

export const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    typeof userId !== 'number' ||
    !spentAt ||
    !title ||
    typeof amount !== 'number' ||
    !category
  ) {
    res.status(400).send('Missing required fields');

    return;
  }

  if (userService.getById(userId) === null) {
    res.status(400).send('User not found');

    return;
  }

  const expense = await expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  });

  res.status(201).send(expense);
};

export const update = async (req, res) => {
  const id = Number(req.params.id);
  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const { spentAt, title, amount, category, note } = req.body;

  const updatedExpense = await expenseService.update({
    id,
    userId: expense.userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.send(updatedExpense);
};

export const remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!expenseService.getById(id)) {
    res.status(404).send('Not found');

    return;
  }
  await expenseService.remove(id);
  res.sendStatus(204);
};
