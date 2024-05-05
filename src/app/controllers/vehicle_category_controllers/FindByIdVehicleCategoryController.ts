import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryFindByIdService } from '../../services/vehicle_category_services/VehicleCategoryFindByIdService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class FindByIdVehicleCategoryController {
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
          const id = req.params.id;
          const vehicleCategory = await vehicleCategoryFindByIdService.findById(id);
          res.status(StatusCodes.OK).send(vehicleCategory);
        } catch (error) {
          console.error(AppError);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor!' });
          next(error);
        }
      }
    
}

const findByIdVehicleCategoryController = new FindByIdVehicleCategoryController();

export { findByIdVehicleCategoryController }