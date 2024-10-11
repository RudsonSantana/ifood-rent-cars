import { Request, Response, NextFunction } from 'express';
import { customerForgotPasswordService } from '../../services/password_service/CustomerForgotPasswordService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';
import { customerFindByEmailService } from '../../services/customer_services/CustomerFindByEmailService';

class CustomerForgotPasswordController {
    async forgotCustomerPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, cpf } = req.body;
            const reply = await customerForgotPasswordService.forgotPassword({ email, cpf });
            const customer = await customerFindByEmailService.findByEmail(email);
            res.status(StatusCodes.OK).format({
                'text/html': () => {
                    res
                        .cookie('token', reply, { httpOnly: true, maxAge: 3600000 })
                        .redirect(`/password/customer/change/:id${customer.id}`)
                    ;
                },
                'application/json': () => {
                    res.json(reply);
                }
            });
            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const customerForgotPasswordController = new CustomerForgotPasswordController();

export { customerForgotPasswordController }