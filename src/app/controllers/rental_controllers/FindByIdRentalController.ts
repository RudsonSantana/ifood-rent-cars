import { Request, Response, NextFunction } from 'express';
import { rentalFindByIdService } from '../../services/rental_services/RentalFindByIdService';

class FindByIdRentalController {
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
          const rentalId = req.params.id;
          const rental = await rentalFindByIdService.findById(rentalId);
          res.send(rental);
          next();
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: 'Erro interno do servidor' });
          next(error);
        }
      }
}

const findByIdRentalController = new FindByIdRentalController();

export { findByIdRentalController }