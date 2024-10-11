import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { rentalStatusFindByIdService } from '../../services/rental_status_services/RentalStatusFindByIdService';

class ValidateRentalStatusParamsIdMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const rentalStatus = await rentalStatusFindByIdService.findById(id);

            if (!rentalStatus) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Status de Alguel inválido!' });
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateRentalStatusParamsIdMiddleware = new ValidateRentalStatusParamsIdMiddleware();

export { validateRentalStatusParamsIdMiddleware }