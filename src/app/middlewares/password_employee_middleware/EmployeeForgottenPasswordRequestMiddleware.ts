import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { employeeFindByEmailService } from '../../services/employee_services/EmployeeFindByEmailService';
import { employeeFindByCpfService } from '../../services/employee_services/EmployeeFindByCpfService';

class EmployeeForgottenPasswordRequestMiddleware {
    async check(req: Request, res: Response, next: NextFunction) {
        const { email, cpf } = req.body;
        try {
            const employeeEmail = await employeeFindByEmailService.findByEmail(email);
            
            const employeeCPF = await employeeFindByCpfService.findByCpf(cpf)
            const compareCpf = await bcrypt.compareSync(cpf, employeeCPF.cpf)          

            if (!employeeEmail) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email ou CPF inválidos' });
            }
            
            else if (!compareCpf) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email ou CPF inválidos' });
            }

            else if (employeeEmail != employeeCPF) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email ou CPF inválidos' });
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

const employeeForgottenPasswordRequestMiddleware = new EmployeeForgottenPasswordRequestMiddleware();

export { employeeForgottenPasswordRequestMiddleware }