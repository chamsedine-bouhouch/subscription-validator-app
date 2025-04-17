import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // make sure you have `export default` in your db.js

const Inscription = sequelize.define('Inscription', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  lastname: DataTypes.STRING,
  email: DataTypes.STRING,
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  bearer_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  validation_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'inscription',
  timestamps: false,
});

export default Inscription;
