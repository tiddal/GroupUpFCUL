const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	edit: celebrate({
		[Segments.BODY]: Joi.object().keys({
			admin: Joi.object()
				.required()
				.keys({
					previleges: Joi.number().integer().valid(1, 2, 3),
				}),
		}),
	}),
};
