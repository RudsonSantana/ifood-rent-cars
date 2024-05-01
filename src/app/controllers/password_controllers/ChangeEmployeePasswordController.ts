import { Request, Response, NextFunction } from 'express';
import { employeePasswordUpdateService } from '../../services/employee_services/EmployeePasswordUpdateService';
import { employeeFindByIdService } from '../../services/employee_services/EmployeeFindByIdService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';


class ChangeEmployeePasswordController {
    async changeEmployeePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id;
            
            const employee = await employeeFindByIdService.findById(id);

            if (employee) {
                await employeePasswordUpdateService.passwordUpdate(id, newPassword, confirmNewPassword);
                res.status(StatusCodes.OK).send({ message: 'Senha atualizada com sucesso!' });
            }

            if (!employee) {
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

const changeEmployeePasswordController = new ChangeEmployeePasswordController();

export { changeEmployeePasswordController }