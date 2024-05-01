import { Request, Response, NextFunction } from 'express';
import { rentalFindByIdService } from '../../services/rental_services/RentalFindByIdService';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class FindByIdRentalController {
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
          const rentalId = req.params.id;
          const rental = await rentalFindByIdService.findById(rentalId);
          res.status(StatusCodes.OK).send(rental);
          next();
        } catch (error) {
          console.error(AppError);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
          next(error);
        }
      }
}

const findByIdRentalController = new FindByIdRentalController();

export { findByIdRentalController }