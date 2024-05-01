import { Request, Response, NextFunction } from 'express';
import { employeePositionCreateService } from '../../services/employee_position_services/EmployeePositionCreateService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class CreateEmployeePositionController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      if (!name) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ error: 'Necessário fornecer todos os dados' });
        return next();
      }

      const upperCaseName = name.toUpperCase();
      const newEmployeePosition = await employeePositionCreateService.create({ name: upperCaseName });
      res.status(StatusCodes.CREATED).send(newEmployeePosition);
      
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const createEmployeePositionController = new CreateEmployeePositionController();

export { createEmployeePositionController }