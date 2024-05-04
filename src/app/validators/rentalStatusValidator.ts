import Joi from 'joi';

export const rentalStatusValidator = Joi.object({
    status: Joi.string().required().uppercase()
});