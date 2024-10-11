import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { vehicleCategoryFindAllService } from '../../services/vehicle_category_services/VehicleCategoryFindAllService';


class ValidateVehicleCategoryMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.body.category;

      if (!category) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Categoria não especificada' });
      }

      const vehicleCategories = await vehicleCategoryFindAllService.findAll();

      if (!vehicleCategories || vehicleCategories.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Não foi possível encontrar categorias de veículos' });
      }

      const vehicleCategory = vehicleCategories.find(item => item.name === category.toUpperCase());

      if (!vehicleCategory) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Categoria inválida' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const validateVehicleCategoryMiddleware = new ValidateVehicleCategoryMiddleware();

export { validateVehicleCategoryMiddleware };
