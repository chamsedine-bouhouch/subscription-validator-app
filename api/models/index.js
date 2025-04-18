import sequelize from '../db.js';
import Inscription from './Inscription.js';
import User from './User.js';

// Define relationships
User.hasOne(Inscription, {
  foreignKey: 'user_id',
  as: 'inscription',
});

Inscription.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

export {
  sequelize,
  Inscription,
  User,
};
