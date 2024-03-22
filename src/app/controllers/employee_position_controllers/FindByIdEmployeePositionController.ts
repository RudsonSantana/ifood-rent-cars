import { Request, Response, NextFunction } from 'express';
import { employeePositionFindByIdService } from '../../services/employee_position_services/EmployeePositionFindByIdService';

class FindByIdEmployeePositionController {
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const employeePosition = await employeePositionFindByIdService.findById(id);

            if (employeePosition) {
                res.send(employeePosition);
            } else {
                res.status(404).send({ error: 'Licensa não encontrada' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findByIdEmployeePositionController = new FindByIdEmployeePositionController();

export { findByIdEmployeePositionController }