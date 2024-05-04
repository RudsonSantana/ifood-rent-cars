import { Request, Response, NextFunction } from 'express';
import { rentalStatusRepository } from '../../../infra/db/sequelize/repositories/rentalStatusRepository';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class ValidateRentalStatusParamsIdMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const rentalStatus = await rentalStatusRepository.findById(id);

            if (!rentalStatus) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Status de Alguel inválido!' });
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateRentalStatusParamsIdMiddleware = new ValidateRentalStatusParamsIdMiddleware();

export { validateRentalStatusParamsIdMiddleware }