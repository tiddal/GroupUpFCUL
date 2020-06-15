const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	find: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			code: Joi.string().required(),
			unit_code: Joi.number().required(),
			project_year: Joi.string().length(9).required(),
			project_number: Joi.number().required(),
			team_number: Joi.string().alphanum().required(),
		}),
	}),

	edit: celebrate({
		[Segments.BODY]: Joi.object().keys({
			team: Joi.object().required().keys({
				name: Joi.string().alphanum(),
				description: Joi.string(),
				logo_url: Joi.string(),
			}),
		}),
	}),
};
