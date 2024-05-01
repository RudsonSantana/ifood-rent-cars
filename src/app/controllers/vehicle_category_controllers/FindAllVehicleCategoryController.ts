import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryFindAllService } from '../../services/vehicles_category_services/VehicleCategoryFindAllService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class FindAllVehicleCategoryController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const vehicleCategories = await vehicleCategoryFindAllService.findAll();
            res.status(StatusCodes.OK).send(vehicleCategories);
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findAllVehicleCategoryController = new FindAllVehicleCategoryController();

export { findAllVehicleCategoryController }