import { Request, Response, NextFunction } from 'express';
import { loginSignInEmployeeService } from '../../services/login_services/LoginSignInEmployeeService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class SingInEmployeeController {
    async signInEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = await loginSignInEmployeeService.signInEmployee({ email, password });
            res.status(StatusCodes.OK).cookie('token', token.accessToken, { httpOnly: true, maxAge: 3600000 });
            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const singInEmployeeController = new SingInEmployeeController();

export { singInEmployeeController };