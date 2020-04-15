const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	find: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			code: Joi.string().required(),
			unit_code: Joi.number().required(),
		}),
	}),

	create: celebrate({
		[Segments.BODY]: Joi.object().keys({
			units: Joi.array()
				.required()
				.items(
					Joi.object({
						code: Joi.number().required(),
						name: Joi.string()
							.pattern(/^[a-zA-Z\u00C0-\u017F ]+$/i)
							.required(),
						semester: Joi.number().integer().min(1).max(6).required(),
						initials: Joi.string().max(3).required(),
						ects: Joi.number().integer().required(),
					}).required()
				),
		}),
	}),

	edit: celebrate({
		[Segments.BODY]: Joi.object().keys({
			unit: Joi.object({
				name: Joi.string().pattern(/^[a-zA-Z\u00C0-\u017F ]+$/i),
				semester: Joi.number().integer().min(1).max(6),
				initials: Joi.string().max(3),
				ects: Joi.number().integer(),
			}).required(),
		}),
	}),
};
