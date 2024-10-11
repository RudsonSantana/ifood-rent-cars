import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { customerFindByEmailService } from '../../services/customer_services/CustomerFindByEmailService';
import { customerFindByCpfService } from '../../services/customer_services/CustomerFindByCpfService';


class CustomerForgottenPasswordRequestMiddleware {
    async check(req: Request, res: Response, next: NextFunction) {
        const { email, cpf } = req.body;
        try {
            const customerEmail = await customerFindByEmailService.findByEmail(email);
            
            const customerCpf = await customerFindByCpfService.findByCpf(cpf);
            const cpfString = String(cpf);
            const compareCustomerCpf = bcrypt.compareSync(cpfString, customerCpf.cpf);

            if (!customerEmail) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email ou CPF inválidos' });
            }    

            if (!compareCustomerCpf) {
                console.log(customerCpf.cpf + " " + cpf);
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email ou CPF inválidos' });
            }

            if (!customerCpf) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email ou CPF inválidos' });
            }

            if (customerCpf.id != customerEmail.id) {
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

const customerForgottenPasswordRequestMiddleware = new CustomerForgottenPasswordRequestMiddleware();

export { customerForgottenPasswordRequestMiddleware }