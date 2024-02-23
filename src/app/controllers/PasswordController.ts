import { Request, Response, NextFunction } from 'express';
import { passwordService } from '../services/PasswordService';
import { customerService } from '../services/CustomerService';
import { employeeService } from '../services/EmployeeService';

class PasswordController {
    async forgotCustomerPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, cpf } = req.body;
            const reply = await passwordService.forgotCustomerPassword({ email, cpf });
            res.send(reply);
            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }

    // async forgotEmployeePassword(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { email, cpf } = req.body;
    //         // const reply = await passwordService.forgotEmployeePassword({ email, cpf });
    //         res.send(reply);
    //         next();
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send({ error: 'Erro interno do servidor' });
    //         next(error);
    //     }
    // }

    async changeCustomerPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id;

            const customer = await customerService.findById(id);

            if (customer) {
                await customerService.passwordUpdate(id, newPassword, confirmNewPassword);
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

    async changeEmployeePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id;
            
            const employee = await employeeService.findById(id);

            if (employee) {
                await employeeService.passwordUpdate(id, newPassword, confirmNewPassword);
                res.status(200).send({ message: 'Senha atualizada com sucesso!' });
            }

            if (!employee) {
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

const passwordController = new PasswordController();

export { passwordController }