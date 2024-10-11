import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';
import { employeeFindByEmailService } from '../../services/employee_services/EmployeeFindByEmailService';
import { employeeForgotPasswordService } from '../../services/employee_services/EmployeeForgotPasswordService';

class EmployeeForgotPasswordController {
    async forgotEmployeePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, cpf } = req.body;
            const reply = await employeeForgotPasswordService.forgotPassword({ email, cpf });
            const emaployee = await employeeFindByEmailService.findByEmail(email);
            res.status(StatusCodes.OK).format({
                'text/html': () => {
                    res
                    .cookie('token', reply, { httpOnly: true, maxAge: 3600000 })
                    .redirect(`/password/employee/change/:id${emaployee.id}`)
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

const employeeForgotPasswordController = new EmployeeForgotPasswordController();

export { employeeForgotPasswordController }