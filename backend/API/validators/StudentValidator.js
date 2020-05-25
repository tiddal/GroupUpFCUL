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
	findClasses: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			username: Joi.string().alphanum().required(),
			academic_year: Joi.string().length(9).required(),
			semester: Joi.number().min(1).max(2).required(),
		}),
	})
};
