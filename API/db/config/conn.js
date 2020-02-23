const Sequelize = require('sequelize');
const dbConfig = require('./config');

const conn = new Sequelize(dbConfig);

module.exports = conn;
