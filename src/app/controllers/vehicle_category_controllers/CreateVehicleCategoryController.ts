import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryCreateService } from '../../services/vehicle_category_services/VehicleCategoryCreateService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class CreateVehicleCategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.body;
      const newvehicleCategory = await vehicleCategoryCreateService.create({ category });
      res.status(StatusCodes.CREATED).send(newvehicleCategory);
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor!' });
      next(error);
    }
  }
}

const createVehicleCategoryController = new CreateVehicleCategoryController();

export { createVehicleCategoryController };