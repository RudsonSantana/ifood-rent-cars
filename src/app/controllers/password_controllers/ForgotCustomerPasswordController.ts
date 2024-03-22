import { Request, Response, NextFunction } from 'express';
import { customerForgotPasswordService } from '../../services/customer_services/CustomerForgotPasswordService';

class ForgotCustomerPasswordController {
    async forgotCustomerPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, cpf } = req.body;
            const reply = await customerForgotPasswordService.forgotPassword({ email, cpf });
            res.cookie('token', reply, { httpOnly: true, maxAge: 3600000 });
            res.send(reply);
            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const forgotCustomerPasswordController = new ForgotCustomerPasswordController();

export { forgotCustomerPasswordController }