import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../../../infra/db/sequelize/repositories/customerRepository';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class ValidateCustomerEmailMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const customer = await customerRepository.findByEmail(email);

            if (customer) {
                return res.status(StatusCodes.CONFLICT).json({ error: 'Email já cadastrado' });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateCustomerEmailMiddleware = new ValidateCustomerEmailMiddleware();

export { validateCustomerEmailMiddleware }