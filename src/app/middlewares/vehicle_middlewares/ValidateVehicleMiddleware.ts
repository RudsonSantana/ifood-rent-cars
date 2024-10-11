import { Request, Response, NextFunction } from 'express';
import { vehicleValidator } from '../../validators/vehicleValidator';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class ValidateVehicleMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { plate, manufacturer, model, year, kilometers, category, hourlyRate } = req.body;
            const { error } = vehicleValidator.validate({ plate, manufacturer, model, year, kilometers, category, hourlyRate });

            if (error) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: "Informações de cadastro de veículo inválidas" });
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Erro interno do servidor" });
            next(error);
        }
    }
}

const validateVehicleMiddleware = new ValidateVehicleMiddleware();

export { validateVehicleMiddleware }