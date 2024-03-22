import { Request, Response, NextFunction } from 'express';
import { rentalStatusFindAllService } from '../../services/rental_status_services/RentalStatusFindAllService';

class FindAllRentalStatusController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const rentalStatus = await rentalStatusFindAllService.findAll();
            res.send(rentalStatus);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findAllRentalStatusController = new FindAllRentalStatusController();

export { findAllRentalStatusController }