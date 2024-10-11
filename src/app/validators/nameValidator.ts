import Joi from 'joi';

export const nameValidator = Joi.object({
    name: Joi.string().required().pattern(new RegExp('^[A-Za-z]+(?: [A-Za-z]+)*$'))
});