import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryFindByIdService } from '../../services/vehicle_category_services/VehicleCategoryFindByIdService';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { idValidator } from '../../validators/idValidator';

class ValidateVehicleCategoryParamsIdMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const { error } = idValidator.validate(id)

            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send({ error: 'Categoria inválida!' })
            }

            const vehicleCategory = await vehicleCategoryFindByIdService.findById(id);

            if (!vehicleCategory) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Categoria inválida!' });
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateVehicleCategoryParamsIdMiddleware = new ValidateVehicleCategoryParamsIdMiddleware();

export { validateVehicleCategoryParamsIdMiddleware }