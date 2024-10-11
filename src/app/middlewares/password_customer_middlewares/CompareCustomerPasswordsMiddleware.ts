import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';
import { encrypt } from '../../helpers/cryptHelper';
import { StatusCodes } from 'http-status-codes';
import { customerFindByIdService } from '../../services/customer_services/CustomerFindByIdService';

class CompareCustomerPasswordsMiddleware {
    async compare(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id

            const encryptNewPassword = encrypt(newPassword);
            const encryptConfirmNewPassword= encrypt(confirmNewPassword);
            const customer = await customerFindByIdService.findById(id);

            if (newPassword != confirmNewPassword) {
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'Senha Inválida!' });
            }

            else if (encryptNewPassword === customer.password) {
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'Senha Inválida!' });
            }

            else if (encryptConfirmNewPassword === customer.password) {
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

const compareCustomerPasswordsMiddleware = new CompareCustomerPasswordsMiddleware();

export { compareCustomerPasswordsMiddleware }