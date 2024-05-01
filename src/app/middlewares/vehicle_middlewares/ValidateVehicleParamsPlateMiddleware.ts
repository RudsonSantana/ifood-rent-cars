import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';
import { vehicleRepository } from '../../../infra/db/sequelize/repositories/vehicleRepository';
import { StatusCodes } from 'http-status-codes';

class ValidateVehicleParamsPlateMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const plate = req.params.plate;

            const vehicle = await vehicleRepository.findByPlate(plate)

            if (!vehicle) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Veículo inválido!' });
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateVehicleParamsPlateMiddleware = new ValidateVehicleParamsPlateMiddleware();

export { validateVehicleParamsPlateMiddleware }