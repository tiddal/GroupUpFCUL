const conn = require('./config/conn');

const User = require('./models/User');
const Student = require('./models/Student');
const Admin = require('./models/Admin');
const Professor = require('./models/Professor');
const Program = require('./models/Program');
const Course = require('./models/Course');
const Class = require('./models/Class');

User.init(conn);
Student.init(conn);
Admin.init(conn);
Professor.init(conn);
Program.init(conn);
Course.init(conn);
Class.init(conn);

Student.associate(conn.models);
Admin.associate(conn.models);
Professor.associate(conn.models);
Program.associate(conn.models);
Course.associate(conn.models);

module.exports = conn;
