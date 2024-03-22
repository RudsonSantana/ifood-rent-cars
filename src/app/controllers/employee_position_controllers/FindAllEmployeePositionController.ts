import { Request, Response, NextFunction } from 'express';
import { employeePositionFindAllService } from '../../services/employee_position_services/EmployeePositionFindAllService';

class FindAllEmployeePositionController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const employeePositions = await employeePositionFindAllService.findAll();
            res.send(employeePositions);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findAllEmployeePositionController = new FindAllEmployeePositionController();

export { findAllEmployeePositionController }