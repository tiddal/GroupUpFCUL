const mysql = require('mysql');
const conn = require('./conn');

module.exports = mysql.createPool(conn(20));
