import { Request, Response, NextFunction } from 'express';
import { rentalStatusRepository } from '../../../infra/db/sequelize/repositories/rentalStatusRepository';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { rentalStatusValidator } from '../../validators/rentalStatusValidator';

class ValidateRentalStatusMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { status } = req.body;
            const { error } = rentalStatusValidator.validate({ status });

            const rentalStatus = await rentalStatusRepository.findByStatus(status);

            if (error) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Status inválido!' });
            }

            if (rentalStatus) {
                return res.status(StatusCodes.CONFLICT).send({ error: "Status já cadastrado!" })
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateRentalStatusMiddleware = new ValidateRentalStatusMiddleware();

export { validateRentalStatusMiddleware }