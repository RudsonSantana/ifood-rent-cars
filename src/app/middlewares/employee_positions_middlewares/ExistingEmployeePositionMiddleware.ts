import { Request, Response, NextFunction } from 'express';
import { employeePositionFindByNameService } from '../../services/employee_position_services/EmployeePositionFindByNameService';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { employeePositionValidator } from '../../validators/employeePositionValidator';

class ExistingEmployeePositionMiddleware {
  async existing(req: Request, res: Response, next: NextFunction) {
    try {
      const { position } = req.body;
      const { error } = employeePositionValidator.validate({ position });

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Posição inválida!' });
      }

      const employeePosition = await employeePositionFindByNameService.findByName(position);

      if (!employeePosition) {
        return res.status(StatusCodes.NOT_FOUND).send({ error: 'Posição inválida!' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor!' });
      next(error);
    }
  }
}

const existingEmployeePositionMiddleware = new ExistingEmployeePositionMiddleware();

export { existingEmployeePositionMiddleware };