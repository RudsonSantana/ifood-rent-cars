import { Request, Response, NextFunction } from 'express';
import { vehicleRepository } from '../../../infra/db/sequelize/repositories/vehicleRepository';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class ExistingVehicleMiddleware {
  async check(req: Request, res: Response, next: NextFunction) {
    try {
      const plate = req.body.plate || req.params.plate;
      const existingVehicle = await vehicleRepository.findByPlate(plate);

      if (existingVehicle) {
        return res.status(StatusCodes.CONFLICT).json({ error: 'Veículo já cadastrado' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const existingVehicleMiddleware = new ExistingVehicleMiddleware();

export { existingVehicleMiddleware };
