const helmet = require('helmet');

helmet.contentSecurityPolicy({
	directives: {
		defaultSrc: ["'self'"]
	}
});

helmet.referrerPolicy({ policy: 'origin-when-cross-origin' });

module.exports = helmet;
