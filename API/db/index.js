const conn = require('./config/conn');

const User = require('./models/User');
const Student = require('./models/Student');

User.init(conn);
Student.init(conn);

Student.associate(conn.models);

module.exports = conn;
