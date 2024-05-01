import { Request, Response, NextFunction } from 'express';
import { parse } from 'date-fns';
import { rentalStartService } from '../../services/rental_services/RentalStartService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class RentalStartController {
    async start(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, startDate } = req.body;
            const formattedStartDate = parse(startDate, "dd-MM-yyyy HH:mm", new Date());
            rentalStartService.start(id, formattedStartDate);
            res.status(StatusCodes.OK).send({ message: 'Veículo retirado da locadora pelo cliente' });
            next();
        } catch (error) {
            console.log(AppError)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const rentalStartController = new RentalStartController();

export { rentalStartController }