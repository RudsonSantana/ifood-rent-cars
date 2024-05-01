import { Request, Response, NextFunction } from 'express';
import { employeeForgotPasswordService } from '../../services/employee_position_services/EmployeeForgotPasswordService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class ForgotEmployeePasswordController {
    async forgotEmployeePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, cpf } = req.body;
            const reply = await employeeForgotPasswordService.forgotPassword({ email, cpf });
            res.status(StatusCodes.OK).cookie('token', reply, { httpOnly: true, maxAge: 3600000 });
            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const forgotEmployeePasswordController = new ForgotEmployeePasswordController();

export { forgotEmployeePasswordController }