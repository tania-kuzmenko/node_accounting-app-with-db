'use strict';
import { sequelize } from '../db.js';
import { DataTypes } from 'sequelize';

export const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'userid',
      allowNull: false,
      foreinKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    spentAt: {
      type: DataTypes.NOW,
      field: 'spentat',
      allowNull: false,
    },
  },
  {
    tableName: 'expenses',
    createdAt: false,
    updatedAt: false,
  },
);
