require('dotenv').config();
const sessions = require('client-sessions');

module.exports = sessions({
	cookieName: 'session',
	secret: process.env.SESSION_SECRET,
	duration: 30 * 60 * 1000 // 30 mins
});
