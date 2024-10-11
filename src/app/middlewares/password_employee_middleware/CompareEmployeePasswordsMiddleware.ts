import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';
import { encrypt } from '../../helpers/cryptHelper';
import { StatusCodes } from 'http-status-codes';
import { employeeFindByIdService } from '../../services/employee_services/EmployeeFindByIdService';

class CompareEmployeePasswordsMiddleware {
    async compare(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id

            const encryptNewPassword = encrypt(newPassword);
            const encryptConfirmNewPassword= encrypt(confirmNewPassword);
            const employee = await employeeFindByIdService.findById(id);

            if (newPassword != confirmNewPassword) {
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'Senha Inválida!' });
            }

            else if (encryptNewPassword === employee.password) {
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'Senha Inválida!' });
            }

            else if (encryptConfirmNewPassword === employee.password) {
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'Senha Inválida!' });
            }

            else {
                next();
            }
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const compareEmployeePasswordsMiddleware = new CompareEmployeePasswordsMiddleware();

export { compareEmployeePasswordsMiddleware }