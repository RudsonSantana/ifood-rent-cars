import { Request, Response, NextFunction } from 'express';
import { employeePositionFindByIdService } from '../../services/employee_position_services/EmployeePositionFindByIdService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class FindByIdEmployeePositionController {
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const employeePosition = await employeePositionFindByIdService.findById(id);

            if (employeePosition) {
                res.status(StatusCodes.OK).send(employeePosition);
            } else {
                res.status(StatusCodes.NOT_FOUND).send({ error: 'Licensa não encontrada' });
            }

        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findByIdEmployeePositionController = new FindByIdEmployeePositionController();

export { findByIdEmployeePositionController }