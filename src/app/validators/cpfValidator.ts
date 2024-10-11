import Joi from 'joi'

export const cpfValidator = Joi.object({
    cpf: Joi.string().required().pattern(new RegExp(/^\d{11}$/))
});
