import { Request, Response, NextFunction } from 'express';
import { encrypt } from '../../helpers/cryptHelper';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { employeeFindByEmailService } from '../../services/employee_services/EmployeeFindByEmailService';

class EmployeeLoginVerificationMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const passwordProvided = encrypt(password);
            const employee = await employeeFindByEmailService.findByEmail(email);

            if (!employee) {
                res.status(StatusCodes.UNAUTHORIZED).redirect('/login/employee');
            }

            else if (employee.password != passwordProvided) {
                res.status(StatusCodes.UNAUTHORIZED).redirect('/login/employee');
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

const employeeLoginVerificationMiddleware = new EmployeeLoginVerificationMiddleware();

export { employeeLoginVerificationMiddleware }