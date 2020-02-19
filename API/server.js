require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const routes = require('./routes');

app.use(express.json());
app.use('/api', routes);

app.listen(port, () =>
	console.log(`Server is running on: http://localhost:${port}/api`)
);
