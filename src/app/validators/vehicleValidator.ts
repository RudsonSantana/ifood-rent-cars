import Joi from 'joi';

const validPlateFormat = (plate: string): boolean => {
    const format1 = /^[A-Z]{3}\d[A-Z]\d{2}$/;
    const format2 = /^[A-Z]{3}\d{4}$/;

    return format1.test(plate) || format2.test(plate);
};

export const vehicleValidator = Joi.object({
    plate: Joi.string().required().length(7).custom(validPlateFormat), 
    manufacturer: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().required().positive().integer(),
    kilometers: Joi.number().required(),
    category: Joi.string().required(),
    hourlyRate: Joi.number().required()
});