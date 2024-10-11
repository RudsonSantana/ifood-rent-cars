import { Request, Response, NextFunction } from 'express';
import { customerFindByIdService } from '../../services/customer_services/CustomerFindByIdService';
import { customerPasswordUpdateService } from '../../services/customer_services/CustomerPasswordUpdateService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class CustomerChangePasswordController {
    async changeCustomerPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id;

            const customer = await customerFindByIdService.findById(id);

            if (customer) {
                await customerPasswordUpdateService.passwordUpdate(id, newPassword, confirmNewPassword);
                res.status(StatusCodes.OK).send({ message: 'Senha atualizada com sucesso!' });
            }

            if (!customer) {
                res.status(StatusCodes.NOT_FOUND).send({ error: "Usuário não encontrado" });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const customerChangePasswordController = new CustomerChangePasswordController();

export { customerChangePasswordController }