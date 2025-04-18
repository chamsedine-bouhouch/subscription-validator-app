import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Inscription = sequelize.define('Inscription', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
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
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: true, // It's optional until the inscription is validated and a user is created
  },
}, {
  tableName: 'inscription',
  timestamps: true,
});

export default Inscription;
