const pool = require('./config/pool');
const { getAll, getById } = require('./utils');

let users = {
	all: () => getAll('users'),
	byId: (id) => getById('users', id)
};

module.exports = users;
