import { Request, Response, NextFunction } from 'express';
import { loginSignInEmployeeService } from '../../services/login_services/LoginSignInEmployeeService';

class SingInEmployeeController {
    async signInEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = await loginSignInEmployeeService.signInEmployee({ email, password });
            res.status(200).cookie('token', token.accessToken, { httpOnly: true, maxAge: 3600000 });
            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const singInEmployeeController = new SingInEmployeeController();

export { singInEmployeeController };