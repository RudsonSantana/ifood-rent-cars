import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryCreateService } from '../../services/vehicles_category_services/VehicleCategoryCreateService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class CreateVehicleCategoryController {
    async create(req: Request, res: Response, next: NextFunction) {
      try {
        const { name } = req.body;
  
        if (!name) {
          res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ error: 'Necessário fornecer todos os dados' });
          return next();
        }
        
        const upperCaseName = name.toUpperCase();
        const newvehicleCategory = await vehicleCategoryCreateService.create({name: upperCaseName});
        res.status(StatusCodes.CREATED).send(newvehicleCategory);
      } catch (error) {
        console.error(AppError);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
  }
  
  const createVehicleCategoryController = new CreateVehicleCategoryController();
  
  export { createVehicleCategoryController };