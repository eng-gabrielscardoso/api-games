require('dotenv-safe').config();
const connection = require('../connection');
const { Sequelize } = require('sequelize');

const Games = connection.define('games', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  developer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  }
});

Games.sync({ force: false });

module.exports = Games;
