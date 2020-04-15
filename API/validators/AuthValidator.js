const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	login: celebrate({
		[Segments.BODY]: Joi.object().keys({
			user: Joi.object().required().keys({
				email: Joi.string().email().required(),
				password: Joi.string().required(),
			}),
		}),
	}),

	cookie: celebrate({
		[Segments.COOKIES]: Joi.object().keys({
			session: Joi.string().required(),
		}),
	}),
};
