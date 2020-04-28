const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	create: celebrate({
		[Segments.BODY]: Joi.object().keys({
			meeting: Joi.object().required().keys({
				topic: Joi.string().required(),
				begins_at: Joi.string().required(),
				ends_at: Joi.string().required(),
			}),
		}),
	}),

	find: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			code: Joi.string().required(),
			unit_code: Joi.number().required(),
			project_year: Joi.string().length(9).required(),
			project_number: Joi.number().required(),
			team_number: Joi.string().alphanum().required(),
			meeting_number: Joi.string().alphanum().required(),
		}),
	}),

	edit: celebrate({
		[Segments.BODY]: Joi.object().keys({
			meeting: Joi.object().required().keys({
				topic: Joi.string(),
				begins_at: Joi.string(),
				ends_at: Joi.string(),
			}),
		}),
	}),

	removeStudents: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			code: Joi.string().required(),
			unit_code: Joi.number().required(),
			project_year: Joi.string().length(9).required(),
			project_number: Joi.number().required(),
			team_number: Joi.string().alphanum().required(),
			meeting_number: Joi.string().alphanum().required(),
			username: Joi.string().alphanum().required(),
		}),
	}),
};
