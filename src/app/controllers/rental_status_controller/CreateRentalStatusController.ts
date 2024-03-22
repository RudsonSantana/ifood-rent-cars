import { Request, Response, NextFunction } from 'express';
import { rentalStatusCreateService } from '../../services/rental_status_services/RentalStatusCreateService';


class CreateRentalStatusController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.body;

      if (!status) {
        res.status(400).send({ error: 'Necessário fornecer todos os dados' });
        return next();
      }

      const upperCaseStatus = status.toUpperCase();
      const newRentalStatus = await rentalStatusCreateService.create({ status: upperCaseStatus });
      res.status(201).send(newRentalStatus);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const createRentalStatusController = new CreateRentalStatusController();

export { createRentalStatusController };