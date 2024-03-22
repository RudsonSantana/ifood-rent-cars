import { Request, Response, NextFunction } from 'express';
import { customerFindByIdService } from '../../services/customer_services/CustomerFindByIdService';
import { customerPasswordUpdateService } from '../../services/customer_services/CustomerPasswordUpdateService';

class ChangeCustomerPasswordController {
    async changeCustomerPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id;

            const customer = await customerFindByIdService.findById(id);

            if (customer) {
                await customerPasswordUpdateService.passwordUpdate(id, newPassword, confirmNewPassword);
                res.status(200).send({ message: 'Senha atualizada com sucesso!' });
            }

            if (!customer) {
                res.status(404).send({ error: "Usuário não encontrado" });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const changeCustomerPasswordController = new ChangeCustomerPasswordController();

export { changeCustomerPasswordController }