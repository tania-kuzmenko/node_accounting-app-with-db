'use strict';

import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'categories',
    createdAt: false,
    updatedAt: false,
  },
);
