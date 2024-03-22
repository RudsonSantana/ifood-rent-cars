import { Request, Response, NextFunction } from 'express';
import { rentalFindAllService } from '../../services/rental_services/RentalFindAllService';

class FindAllRentalController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
          const rentals = await rentalFindAllService.findAll();
          res.send(rentals);
          next();
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: 'Erro interno do servidor' });
          next(error);
        }
      }
}

const findAllRentalController = new FindAllRentalController();

export { findAllRentalController }