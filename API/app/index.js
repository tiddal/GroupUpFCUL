const express = require('express');

class App {
	constructor() {
		this.express = express();
		this.middleware();
		this.routes();
		this.errors();
	}

	middleware() {
		this.express.use(require('../middleware/cors'));
		this.express.use(require('../middleware/helmet')());
		this.express.use(require('cookie-parser')());
		this.express.use(express.json());
		this.express.use(express.urlencoded({ extended: true }));
		this.express.use(require('morgan')('dev'));
		this.express.use(require('../middleware/sessions'));
		this.express.use(require('../middleware/permissions').sessionRequired);
	}

	routes() {
		this.express.use(require('../routes'));
	}

	errors() {
		this.express.use(require('celebrate').errors());
		this.express.use(require('../middleware/errorHandler'));
	}
}

module.exports = new App().express;
