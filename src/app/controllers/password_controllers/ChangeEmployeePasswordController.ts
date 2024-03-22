import { Request, Response, NextFunction } from 'express';
import { employeePasswordUpdateService } from '../../services/employee_services/EmployeePasswordUpdateService';
import { employeeFindByIdService } from '../../services/employee_services/EmployeeFindByIdService';

class ChangeEmployeePasswordController {
    async changeEmployeePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id;
            
            const employee = await employeeFindByIdService.findById(id);

            if (employee) {
                await employeePasswordUpdateService.passwordUpdate(id, newPassword, confirmNewPassword);
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

const changeEmployeePasswordController = new ChangeEmployeePasswordController();

export { changeEmployeePasswordController }