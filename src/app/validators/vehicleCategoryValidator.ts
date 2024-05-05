import Joi from 'joi';

export const vehicleCategoryValidator = Joi.object({
    category: Joi.string().required().uppercase()
});