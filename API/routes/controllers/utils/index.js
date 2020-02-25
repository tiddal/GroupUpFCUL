module.exports.status = (res, code) => {
	const codes = {
		200: 'Ok',
		400: 'Bad Request',
		404: 'Not Found',
		500: 'Server Error'
	};
	return res.status(code).json({ code, message: codes[code] });
};

module.exports.insertOne = (body, res, Model) => {
	Model.create(body)
		.then((result) => res.json(result))
		.catch((err) => status(res, 400));
};

module.exports.insertMany = (body, res, Model) => {
	Model.bulkCreate(body)
		.then((results) => res.json(results))
		.catch((err) => status(res, 400));
};
