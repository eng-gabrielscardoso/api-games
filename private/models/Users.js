require('dotenv-safe').config();
const connection = require('../connection');
const { Sequelize } = require('sequelize');

const Users = connection.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Users.sync({ force: false });

module.exports = Users;
