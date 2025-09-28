import * as categoryService from '../services/category.service.js';

export const get = async (req, res) => {
  const categories = await categoryService.getAll();

  res.send(categories);
};

export const getOne = async (req, res) => {
  const id = Number(req.params.id);
  const category = await categoryService.getById(id);

  if (!category) {
    return res.status(404).send('Not found');
  }
  res.send(category);
};

export const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const category = await categoryService.create(name);

  res.status(201).send(category);
};

export const update = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  if (!id) {
    return res.status(400).send('ID is required');
  }

  const isExist = await categoryService.getById(id);
  if (!isExist) {
    return res.status(404).send('Category Not found');
  }

  const updatedCategory = await categoryService.update({ id, name });
  res.send(updatedCategory);
};

export const remove = async (req, res) => {
  const id = Number(req.params.id);

  const isExist = await categoryService.getById(id);
  if (!isExist) {
    res.status(404).send('Not found');

    return;
  }

  await categoryService.remove(id);
  res.sendStatus(204);
};
