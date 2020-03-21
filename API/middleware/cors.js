require('dotenv').config();
const cors = require('cors');

module.exports = cors({
	origin: process.env.FRONT_END_URL,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true
});
