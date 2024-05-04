import Joi from 'joi'

export const licenseCategoryValidator = Joi.object({
    licenseCategory: Joi.string().required().uppercase()
});