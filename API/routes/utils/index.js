exports.getAll = async (table, repsonse) => {
	try {
		let result = await table.all();
		repsonse.json(result);
	} catch (err) {
		repsonse.sendStatus(500);
	}
};

exports.getById = async (table, id, response) => {
	try {
		let result = await table.byId(id);
		response.json(result);
	} catch (err) {
		response.sendStatus(500);
	}
};
