import { Request, Response, NextFunction } from 'express';
import { employeePositionCreateService } from '../../services/employee_position_services/EmployeePositionCreateService';

class CreateEmployeePositionController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      if (!name) {
        res.status(400).send({ error: 'Necessário fornecer todos os dados' });
        return next();
      }

      const upperCaseName = name.toUpperCase();
      const newEmployeePosition = await employeePositionCreateService.create({ name: upperCaseName });
      res.status(201).send(newEmployeePosition);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const createEmployeePositionController = new CreateEmployeePositionController();

export { createEmployeePositionController }