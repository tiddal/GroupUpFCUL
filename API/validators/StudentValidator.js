const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	edit: celebrate({
		[Segments.BODY]: Joi.object().keys({
			student: Joi.object().required().keys({
				working_student: Joi.bool(),
				github: Joi.string(),
				facebook: Joi.string(),
				instagram: Joi.string(),
				twitter: Joi.string(),
			}),
		}),
	}),
};
