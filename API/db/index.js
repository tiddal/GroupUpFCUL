const conn = require('./config/conn');
const User = require('./models/User');

User.init(conn);

module.exports = conn;
