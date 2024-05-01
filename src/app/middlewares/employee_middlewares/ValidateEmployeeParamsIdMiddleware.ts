import { Request, Response, NextFunction } from 'express';
import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class ValidateEmployeeParamsIdMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const employee = await employeeRepository.findById(id);

            if (!employee) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Customer inválido!' });
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateEmployeeParamsIdMiddleware = new ValidateEmployeeParamsIdMiddleware();

export { validateEmployeeParamsIdMiddleware }