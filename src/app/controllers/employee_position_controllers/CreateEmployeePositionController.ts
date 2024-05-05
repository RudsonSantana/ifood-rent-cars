import { Request, Response, NextFunction } from 'express';
import { employeePositionCreateService } from '../../services/employee_position_services/EmployeePositionCreateService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class CreateEmployeePositionController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { position } = req.body;
      const newEmployeePosition = await employeePositionCreateService.create({ position });
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