import { Request, Response, NextFunction } from "express";
import { employeePositionFindByIdService } from "../../services/employee_position_services/EmployeePositionFindByIdService";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { idValidator } from "../../validators/idValidator";

class ValidateEmployeePositionParamsIdMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { error } = idValidator.validate(req.params);

            if (error) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Posição Inválida!' });
            }

            const { id } = req.params;
            const employeePosition = await employeePositionFindByIdService.findById(id);

            if (!employeePosition) {
                return res.status(StatusCodes.NOT_FOUND).send({ error: 'Posição Inválida!' });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor!' });
            next();
        }
    }
}

const validateEmployeePositionParamsIdMiddleware = new ValidateEmployeePositionParamsIdMiddleware();

export { validateEmployeePositionParamsIdMiddleware }