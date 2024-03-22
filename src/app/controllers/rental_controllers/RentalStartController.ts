import { Request, Response, NextFunction } from 'express';
import { parse } from 'date-fns';
import { rentalStartService } from '../../services/rental_services/RentalStartService';

class RentalStartController {
    async start(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, startDate } = req.body;
            console.log("Data inicial formatada no controller", startDate)
            const formattedStartDate = parse(startDate, "dd-MM-yyyy HH:mm", new Date());
            rentalStartService.start(id, formattedStartDate);
            res.status(200).send({ message: 'Veículo retirado da locadora pelo cliente' });
            next();
        } catch (error) {
            res.status(400).send({ error: error.message });
            next(error);
        }
    }
}

const rentalStartController = new RentalStartController();

export { rentalStartController }