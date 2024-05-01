import { Request, Response, NextFunction } from 'express';
import { employeePositionFindAllService } from '../../services/employee_position_services/EmployeePositionFindAllService';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class FindAllEmployeePositionController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const employeePositions = await employeePositionFindAllService.findAll();
            res.status(StatusCodes.OK).send(employeePositions);
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findAllEmployeePositionController = new FindAllEmployeePositionController();

export { findAllEmployeePositionController }