import { Request, Response, NextFunction } from 'express';
import { employeeForgotPasswordService } from '../../services/employee_position_services/EmployeeForgotPasswordService';

class ForgotEmployeePasswordController {
    async forgotEmployeePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, cpf } = req.body;
            const reply = await employeeForgotPasswordService.forgotPassword({ email, cpf });
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

const forgotEmployeePasswordController = new ForgotEmployeePasswordController();

export { forgotEmployeePasswordController }