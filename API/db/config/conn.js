const Sequelize = require('sequelize');
const dbConfig = require('./config');
const env = process.env.NODE_ENV || 'development';

const conn = new Sequelize(dbConfig[env]);

module.exports = conn;
