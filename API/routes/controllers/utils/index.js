module.exports.status = (res, code) => {
	const codes = {
		200: 'Ok',
		400: 'Bad Request',
		404: 'Not Found',
		500: 'Server Error'
	};
	return res.status(code).json({ code, message: codes[code] });
};
