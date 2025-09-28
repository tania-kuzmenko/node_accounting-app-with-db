'use strict';
import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.route.js';
import { expenseRouter } from './routes/expense.route.js';
import { categoryRouter } from './routes/category.route.js';

export const createServer = () => {
  const app = express();
  app.use(cors());
  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);
  app.use('/categories', express.json(), categoryRouter);
  return app;
};

