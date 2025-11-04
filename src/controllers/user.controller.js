const userService = require('../services/user.service.js');

const get = async (req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);
  const user = await userService.getById(id);

  if (!user) {
    return res.status(404).send('Not found');
  }
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = userService.create(name);

  res.status(201).send(user);
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = userService.update({ id, name });

  res.send(updatedUser);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

  if (!userService.getById(id)) {
    res.status(404).send('Not found');

    return;
  }

  userService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
