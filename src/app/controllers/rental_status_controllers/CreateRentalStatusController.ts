import { Request, Response, NextFunction } from 'express';
import { rentalStatusCreateService } from '../../services/rental_status_services/RentalStatusCreateService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class CreateRentalStatusController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.body;

      if (!status) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ error: 'Necessário fornecer todos os dados' });
        return next();
      }

      const upperCaseStatus = status.toUpperCase();
      const newRentalStatus = await rentalStatusCreateService.create({ status: upperCaseStatus });
      res.status(StatusCodes.CREATED).send(newRentalStatus);
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const createRentalStatusController = new CreateRentalStatusController();

export { createRentalStatusController };