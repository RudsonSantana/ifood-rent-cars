import { Request, Response, NextFunction } from 'express';
import { rentalStatusFindByIdService } from '../../services/rental_status_services/RentalStatusFindByIdService';

class FindByIdRentalStatusController {
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const rentalStatus = await rentalStatusFindByIdService.findById(id);

            if (rentalStatus) {
                res.send(rentalStatus);
            } else {
                res.status(404).send({ error: 'Licensa não encontrada' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findByIdRentalStatusController = new FindByIdRentalStatusController();

export { findByIdRentalStatusController }