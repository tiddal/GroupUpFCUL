const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	find: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			code: Joi.string().required(),
			unit_code: Joi.number().required(),
			year: Joi.string().length(9).required(),
			class_number: Joi.string().required(),
		}),
	}),

	create: celebrate({
		[Segments.BODY]: Joi.object().keys({
			classes: Joi.array()
				.required()
				.items(
					Joi.object({
						number: Joi.string().alphanum().required(),
						begins_at: Joi.string().required(),
						ends_at: Joi.string().required(),
						week_day: Joi.number().min(1).max(7).required(),
						academic_year: Joi.string().length(9).required(),
					}).required()
				),
		}),
	}),

	edit: celebrate({
		[Segments.BODY]: Joi.object().keys({
			class: Joi.object({
				number: Joi.string().alphanum(),
				begins_at: Joi.string(),
				ends_at: Joi.string().required(),
				week_day: Joi.number().min(1).max(7),
				academic_year: Joi.string().length(9),
			}).required(),
		}),
	}),

	createStudents: celebrate({
		[Segments.BODY]: Joi.object().keys({
			students: Joi.array()
				.required()
				.items(
					Joi.object({
						username: Joi.string().alphanum().required(),
					})
				),
		}),
	}),

	createProfessors: celebrate({
		[Segments.BODY]: Joi.object().keys({
			professors: Joi.array()
				.required()
				.items(
					Joi.object({
						username: Joi.string().alphanum().required(),
					})
				),
		}),
	}),

	removeStudent: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			code: Joi.string().required(),
			unit_code: Joi.number().required(),
			year: Joi.string().length(9).required(),
			class_number: Joi.string().required(),
			student_username: Joi.string().alphanum().required(),
		}),
	}),

	removeProfessor: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			code: Joi.string().required(),
			unit_code: Joi.number().required(),
			year: Joi.string().length(9).required(),
			class_number: Joi.string().required(),
			professor_username: Joi.string().alphanum().required(),
		}),
	}),
};
