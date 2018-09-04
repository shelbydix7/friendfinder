import Joi from 'joi';

const schema = Joi.object().keys({
  name: Joi.string()
    .regex(/^[a-zA-Z. ]*$/)
    .trim()
    .required()
    .error(new Error('Please enter valid name')),

  scores: Joi.array().items(
    Joi.string()
      .required()
      .max(1)
      .error(new Error('Please answer all of the questions'))
  )
});

export default schema;