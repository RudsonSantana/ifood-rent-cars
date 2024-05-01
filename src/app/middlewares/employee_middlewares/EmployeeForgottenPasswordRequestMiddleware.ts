import { Request, Response, NextFunction } from 'express';
import { employeeRepository } from "../../../infra/db/sequelize/repositories/employeeRepository";
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class EmployeeForgottenPasswordRequestMiddleware {
    async check(req: Request, res: Response, next: NextFunction) {
        const { email, cpf } = req.body;
        try {
            const employeeEmail = await employeeRepository.findByEmail(email);
            
            const employeeCPF = await employeeRepository.findByCpf(cpf)
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