require('dotenv').config();
const app = require('./routes');
const port = process.env.PORT || 3333;

app.listen(port, () =>
	console.log(`Server is running on: http://localhost:${port}`)
);
