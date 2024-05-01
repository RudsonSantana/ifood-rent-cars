import { Request, Response, NextFunction } from 'express';
import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class ValidateEmployeeCpfMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpf } = req.body;
            const employee = await employeeRepository.findByCpf(cpf);

            if (employee) {
                const compareCpf = await bcrypt.compare(cpf, employee.cpf);
                if (compareCpf) {
                    return res.status(StatusCodes.CONFLICT).json({ error: 'CPF já cadastrado' });
                }
            }

            if (cpf.length !== 11) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'CPF deve ter 11 caracteres' });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateEmployeeCpfMiddleware = new ValidateEmployeeCpfMiddleware();

export { validateEmployeeCpfMiddleware };
