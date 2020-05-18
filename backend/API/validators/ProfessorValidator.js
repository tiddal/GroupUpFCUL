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

	findClasses: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			username: Joi.string().alphanum().required(),
			academic_year: Joi.string().length(9).required(),
			semester: Joi.number().min(1).max(2).required(),
		}),
	}),
};
