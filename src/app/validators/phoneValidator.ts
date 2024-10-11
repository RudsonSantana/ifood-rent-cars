import Joi from 'joi';

export const phoneValidator = Joi.object({
    phone: Joi.string().required().pattern(new RegExp(/^\d{10,11}$/))
});