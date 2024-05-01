import { Request, Response, NextFunction } from 'express';
import { loginSignInCustomerService } from '../../services/login_services/LoginSignInCustomerService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class SingInCustomerController {
    async signInCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = await loginSignInCustomerService.signInCustomer({ email, password });
            res.status(StatusCodes.OK).cookie('token', token.accessToken, { httpOnly: true, maxAge: 3600000 });
            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const singInCustomerController = new SingInCustomerController()

export { singInCustomerController }