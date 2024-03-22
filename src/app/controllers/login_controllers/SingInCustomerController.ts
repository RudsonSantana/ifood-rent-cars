import { Request, Response, NextFunction } from 'express';
import { loginSignInCustomerService } from '../../services/login_services/LoginSignInCustomerService';

class SingInCustomerController {
    async signInCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = await loginSignInCustomerService.signInCustomer({ email, password });
            res.status(200).cookie('token', token.accessToken, { httpOnly: true, maxAge: 3600000 });
            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const singInCustomerController = new SingInCustomerController()

export { singInCustomerController }