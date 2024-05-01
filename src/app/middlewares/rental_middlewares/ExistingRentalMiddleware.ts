import { Request, Response, NextFunction } from 'express';
import { rentalRepository } from '../../../infra/db/sequelize/repositories/rentalRepository';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class ExistingRentalMiddleware {
  async check(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id || req.params.id;

    try {
      const existingRental = await rentalRepository.findById(id);

      if (!existingRental) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Aluguel não encontrado' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const existingRentalMiddleware = new ExistingRentalMiddleware();

export { existingRentalMiddleware };
