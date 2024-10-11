import { Request, Response, NextFunction } from 'express';
import { employeeLoginService } from '../../services/login_services/EmployeeLoginService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';


class EmployeeLoginController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = await employeeLoginService.login({ email, password });
            res.status(StatusCodes.OK).format({
                'text/html': () => {
                    res.cookie('token', token.accessToken, { httpOnly: true, maxAge: 3600000 });
                },
                'application/json': () => {
                    res.json(token);
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

const employeeLoginController = new EmployeeLoginController();

export { employeeLoginController };