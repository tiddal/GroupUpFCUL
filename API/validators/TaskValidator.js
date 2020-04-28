const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	create: celebrate({
		[Segments.BODY]: Joi.object().keys({
			task: Joi.object().required().keys({
				title: Joi.string().required(),
				description: Joi.string(),
				start_date: Joi.string().required(),
				end_date: Joi.string().required(),
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
			task_number: Joi.number().required(),
		}),
	}),

	edit: celebrate({
		[Segments.BODY]: Joi.object().keys({
			task: Joi.object().required().keys({
				title: Joi.string(),
				description: Joi.string(),
				start_date: Joi.string(),
				end_date: Joi.string(),
			}),
		}),
	}),
};
