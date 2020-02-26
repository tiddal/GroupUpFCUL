const conn = require('./config/conn');

const User = require('./models/User');
const Student = require('./models/Student');
const Admin = require('./models/Admin');

User.init(conn);
Student.init(conn);
Admin.init(conn);

Student.associate(conn.models);
Admin.associate(conn.models);

module.exports = conn;
