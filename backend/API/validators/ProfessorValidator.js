const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	edit: celebrate({
		[Segments.BODY]: Joi.object().keys({
			professor: Joi.object().required().keys({
				room: Joi.string(),
				department: Joi.string(),
			}),
		}),
	}),
};
