import { Request, Response, NextFunction } from 'express';
import { customerRepository } from "../../../infra/db/sequelize/repositories/customerRepository";
import { encrypt } from '../../helpers/cryptHelper';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class CustomerLoginVerificationMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const customer = await customerRepository.findByEmail(email);
            const passwordProvided = encrypt(password);

            if (!customer || customer.password != passwordProvided) {
                res.status(StatusCodes.UNAUTHORIZED).redirect('/login/customer');
            }

            else {
                next();
            }

        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const customerLoginVerificationMiddleware = new CustomerLoginVerificationMiddleware();

export { customerLoginVerificationMiddleware }