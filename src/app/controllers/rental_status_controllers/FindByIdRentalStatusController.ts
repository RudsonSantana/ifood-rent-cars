import { Request, Response, NextFunction } from 'express';
import { rentalStatusFindByIdService } from '../../services/rental_status_services/RentalStatusFindByIdService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class FindByIdRentalStatusController {
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const rentalStatus = await rentalStatusFindByIdService.findById(id);

            if (rentalStatus) {
                res.status(StatusCodes.OK).send(rentalStatus);
            } else {
                res.status(StatusCodes.NOT_FOUND).send({ error: 'Licensa não encontrada' });
            }

        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findByIdRentalStatusController = new FindByIdRentalStatusController();

export { findByIdRentalStatusController }