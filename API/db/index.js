const conn = require('./config/conn');

const User = require('./models/User');
const Student = require('./models/Student');
const Admin = require('./models/Admin');
const Professor = require('./models/Professor');

User.init(conn);
Student.init(conn);
Admin.init(conn);
Professor.init(conn);

Student.associate(conn.models);
Admin.associate(conn.models);
Professor.associate(conn.models);

module.exports = conn;
