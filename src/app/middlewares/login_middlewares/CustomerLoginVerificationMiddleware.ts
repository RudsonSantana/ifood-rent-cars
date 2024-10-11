import { Request, Response, NextFunction } from 'express';
import { encrypt } from '../../helpers/cryptHelper';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { customerFindByEmailService } from '../../services/customer_services/CustomerFindByEmailService';

class CustomerLoginVerificationMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const customer = await customerFindByEmailService.findByEmail(email);
            const passwordProvided = encrypt(password);

            if (!customer || customer.password != passwordProvided) {
                return res.status(StatusCodes.UNAUTHORIZED).redirect('/login/customer');
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