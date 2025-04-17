import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Inscription from './Inscription.js';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    references: {
      model: Inscription,
      key: 'id',
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'user',
  timestamps: false,
});

export default User;
