const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	find: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			username: Joi.string().alphanum().required(),
		}),
	}),

	create: celebrate({
		[Segments.BODY]: Joi.object().keys({
			users: Joi.array()
				.required()
				.items(
					Joi.object({
						username: Joi.string().alphanum().required(),
						first_name: Joi.string()
							.pattern(/^[a-zA-Z\u00C0-\u017F ]+$/i)
							.required(),
						last_name: Joi.string()
							.pattern(/^[a-zA-Z\u00C0-\u017F ]+$/i)
							.required(),
						email: Joi.string().email().required(),
						password: Joi.string().required(),
						role: Joi.object()
							.required()
							.keys({
								type: Joi.string()
									.valid('student', 'professor', 'admin')
									.required(),
								data: Joi.object({
									room: Joi.string().allow('').allow(null),
									department: Joi.string().allow('').allow(null),
									previleges: Joi.number().integer().valid(1, 2, 3),
								}).required(),
							}),
					}).required()
				),
		}),
	}),
};
