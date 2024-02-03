import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { employeeRepository } from '../repositories/EmployeeRepository';
import { AppError } from '../errors/AppError';

class AuthorizationByAttendantMiddleware {
    async authorization(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader = req.header('Authorization');
            const accessToken = authorizationHeader.split(' ')[1];
            const secret = process.env.JWT_SECRET!;
            const decodedToken = jwt.verify(accessToken, secret);

            const position = decodedToken.position;
            const id = decodedToken.id;
            const employee = await employeeRepository.getEmployeeById(id);

            if (!employee) {
                res.status(400).json({ error: 'Usuário não autorizado 1!' });
            }

            else if (!position) {
                res.status(400).json({ error: 'Usuário não autorizado 2!' });
            }

            else if (employee.position != position) {
                res.status(400).json({ error: 'Usuário não autorizado 3!' });
            }

            else if (employee.position != 'ATTENDANT' && employee.position != 'MANAGER') {
                res.status(400).json({ error: 'Usuário não autorizado 4!' });
            }

            else {
                next();
            }
        } catch (error) {
            console.error(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }


    }
}

const authorizationByAttendantMiddleware = new AuthorizationByAttendantMiddleware();

export { authorizationByAttendantMiddleware }