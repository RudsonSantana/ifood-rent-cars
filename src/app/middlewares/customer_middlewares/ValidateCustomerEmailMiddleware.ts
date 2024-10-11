import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { emailValidator } from '../../validators/emailValidator';
import { customerFindByEmailService } from '../../services/customer_services/CustomerFindByEmailService';

class ValidateCustomerEmailMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const { error } = emailValidator.validate({ email });

            if (error) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email inválido' });
            }

            const customer = await customerFindByEmailService.findByEmail(email);

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