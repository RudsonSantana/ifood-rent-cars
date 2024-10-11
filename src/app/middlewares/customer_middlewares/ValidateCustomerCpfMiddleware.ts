import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { cpfValidator } from '../../validators/cpfValidator';
import { customerFindByCpfService } from '../../services/customer_services/CustomerFindByCpfService';

class ValidateCustomerCpfMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpf } = req.body;
            const { error } = cpfValidator.validate({ cpf });

            if (error) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'CPF deve ter 11 caracteres, somente números' });
            }

            const customer = await customerFindByCpfService.findByCpf(cpf);

            if (customer) {
                const compareCpf = await bcrypt.compare(cpf, customer.cpf);
                if (compareCpf) {
                    return res.status(StatusCodes.CONFLICT).json({ error: 'CPF já cadastrado' });
                }
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ AppError: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateCustomerCpfMiddleware = new ValidateCustomerCpfMiddleware();

export { validateCustomerCpfMiddleware };