import { Request, Response, NextFunction } from 'express';
import { rentalStatusFindAllService } from '../../services/rental_status_services/RentalStatusFindAllService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class FindAllRentalStatusController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const rentalStatus = await rentalStatusFindAllService.findAll();
            res.status(StatusCodes.OK).send(rentalStatus);
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findAllRentalStatusController = new FindAllRentalStatusController();

export { findAllRentalStatusController }