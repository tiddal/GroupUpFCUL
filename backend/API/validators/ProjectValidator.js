const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      project: Joi.object({
        name: Joi.string()
          .pattern(/^[a-zA-Z\u00C0-\u017F ]+$/i)
          .required(),
        min_students: Joi.number().min(1).max(9).required(),
        max_students: Joi.number().min(1).max(9).required(),
        description: Joi.string(),
        objectives: Joi.string().required(),
        assignment_url: Joi.string().required(),
        stages: Joi.array().required(),
      }).required(),
    }),
  }),
  edit: celebrate({
    [Segments.BODY]: Joi.object().keys({
      project: Joi.object({
        name: Joi.string().pattern(/^[a-zA-Z\u00C0-\u017F ]+$/i),
        min_students: Joi.number().min(1).max(9),
        max_students: Joi.number().min(1).max(9),
        description: Joi.string(),
        objectives: Joi.string(),
        assignment_url: Joi.string(),
      }).required(),
    }),
  }),
  find: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      code: Joi.string().required(),
      unit_code: Joi.number().required(),
      project_year: Joi.string().length(9).required(),
      project_number: Joi.number().required(),
    }),
  }),
  findYear: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      code: Joi.string().required(),
      unit_code: Joi.number().required(),
      project_year: Joi.string().length(9).required(),
    }),
  }),
};
