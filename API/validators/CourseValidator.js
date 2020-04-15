const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	find: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			code: Joi.string().alphanum().required(),
		}),
	}),

	create: celebrate({
		[Segments.BODY]: Joi.object().keys({
			courses: Joi.array()
				.required()
				.items(
					Joi.object({
						code: Joi.string().alphanum().required(),
						name: Joi.string()
							.pattern(/^[a-zA-Z\u00C0-\u017F ]+$/i)
							.required(),
						cycle: Joi.number().valid(1, 2, 3).required(),
						initials: Joi.string().max(3).required(),
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
								})
							),
					}).required()
				),
		}),
	}),

	edit: celebrate({
		[Segments.BODY]: Joi.object().keys({
			course: Joi.object({
				name: Joi.string().pattern(/^[a-zA-Z\u00C0-\u017F ]+$/i),
				initials: Joi.string().max(3),
			}).required(),
		}),
	}),
};
