import { Request, Response, NextFunction } from 'express';
import { rentalFindAllService } from '../../services/rental_services/RentalFindAllService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class FindAllRentalController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
          const rentals = await rentalFindAllService.findAll();
          res.status(StatusCodes.OK).send(rentals);
          next();
        } catch (error) {
          console.error(AppError);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
          next(error);
        }
      }
}

const findAllRentalController = new FindAllRentalController();

export { findAllRentalController }