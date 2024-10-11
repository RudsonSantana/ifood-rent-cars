import { Request, Response, NextFunction } from 'express';
import { customerLoginService } from '../../services/login_services/CustomerLoginService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class CustomerLoginController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = await customerLoginService.login({ email, password });
            res.status(StatusCodes.OK).format({
                'text/html': () => {
                    res
                        .cookie('token', token.accessToken, { httpOnly: true, maxAge: 3600000 })
                        .redirect('/rentals/reserve')
                    ;

                },
                'application/json': () => {
                    res.json(token);
                }
            })
            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const customerLoginController = new CustomerLoginController()

export { customerLoginController }