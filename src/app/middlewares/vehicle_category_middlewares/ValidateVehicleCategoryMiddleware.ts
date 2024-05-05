import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryValidator } from '../../validators/vehicleCategoryValidator';
import { vehicleCategoryFindByNameService } from '../../services/vehicle_category_services/VehicleCategoryFindByNameService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class ValidateVehicleCategoryMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.body;
      const { error } = vehicleCategoryValidator.validate({ category });

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Categoria Inválida!' });
      }

      const vehicleCategory = await vehicleCategoryFindByNameService.findByName(category);

      if (vehicleCategory) {
        return res.status(StatusCodes.CONFLICT).send({ error: 'Categoria já Cadastrada!' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor!' });
      next(error);
    }
  }
}

const validateVehicleCategoryMiddleware = new ValidateVehicleCategoryMiddleware();

export { validateVehicleCategoryMiddleware };
