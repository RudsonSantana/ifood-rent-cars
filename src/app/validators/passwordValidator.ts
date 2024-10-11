import Joi from 'joi'

export const passwordValidator = Joi.object({
    password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^+-~|<>°ºª´`{}¨"'-_=§.,]).{6,20}$/)
        .required()
})