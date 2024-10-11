import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { employeePositionFindByNameService } from '../../services/employee_position_services/EmployeePositionFindByNameService';

class ValidateEmployeePositionMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { position } = req.body;
      const employeePosition = await employeePositionFindByNameService.findByName(position);

      if (!employeePosition) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Posição inválida' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const validateEmployeePositionMiddleware = new ValidateEmployeePositionMiddleware();

export { validateEmployeePositionMiddleware };