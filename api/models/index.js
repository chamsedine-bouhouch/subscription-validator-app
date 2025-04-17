import sequelize from '../db.js';
import Inscription from './Inscription.js';
import User from './User.js';

// Set up associations
User.belongsTo(Inscription, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
});

Inscription.hasOne(User, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});

export { sequelize, Inscription, User };
