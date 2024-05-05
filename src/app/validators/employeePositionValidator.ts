import Joi from 'joi';

export const employeePositionValidator = Joi.object({
    position: Joi.string().required().uppercase()
});