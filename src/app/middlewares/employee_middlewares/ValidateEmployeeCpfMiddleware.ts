import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { cpfValidator } from '../../validators/cpfValidator';
import { employeeFindByCpfService } from '../../services/employee_services/EmployeeFindByCpfService';

class ValidateEmployeeCpfMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpf } = req.body;
            const { error } = cpfValidator.validate({ cpf });

            if (error) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'CPF deve ter 11 caracteres, somente números' });
            }

            const employee = await employeeFindByCpfService.findByCpf(cpf);

            if (employee) {
                const compareCpf = await bcrypt.compare(cpf, employee.cpf);
                if (compareCpf) {
                    return res.status(StatusCodes.CONFLICT).json({ error: 'CPF já cadastrado' });
                }
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
