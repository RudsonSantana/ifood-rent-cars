import { Request, Response, NextFunction } from 'express';
import { customerForgotPasswordService } from '../../services/customer_services/CustomerForgotPasswordService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class ForgotCustomerPasswordController {
    async forgotCustomerPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, cpf } = req.body;
            const reply = await customerForgotPasswordService.forgotPassword({ email, cpf });
            res.status(StatusCodes.OK).cookie('token', reply, { httpOnly: true, maxAge: 3600000 });
            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const forgotCustomerPasswordController = new ForgotCustomerPasswordController();

export { forgotCustomerPasswordController }