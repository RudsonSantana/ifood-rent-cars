import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { employeeFindByIdService } from '../../services/employee_services/EmployeeFindByIdService';
import { employeePositionFindByIdService } from '../../services/employee_position_services/EmployeePositionFindByIdService';

class AuthorizationByManagerMiddleware {
    async authorization(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token;
            const secret = process.env.JWT_SECRET!;
            const decodedToken: any = jwt.verify(token, secret);

            const positionDecoded = decodedToken.position;
            const idDecoded = decodedToken.id;

            const employee = await employeeFindByIdService.findById(idDecoded);
            const position = await employeePositionFindByIdService.findById(positionDecoded);

            if (!employee || !position) {
                return res.status(StatusCodes.UNAUTHORIZED).format({
                    "text/html": () => {
                        res.redirect("/dashboard/employee");
                    },
                    "application/json": () => {
                        res.json({ error: "Usuário não autorizado!" });
                    },
                });
            }

            if (employee.position !== positionDecoded || employee.position !== position.id || position.name.toUpperCase() !== 'MANAGER' && position.name.toUpperCase() !== 'ADMIN') {
                return res.status(StatusCodes.UNAUTHORIZED).format({
                    "text/html": () => {
                        res.redirect("/dashboard/employee");
                    },
                    "application/json": () => {
                        res.json({ error: "Usuário não autorizado!" });
                    },
                });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const authorizationByManagerMiddleware = new AuthorizationByManagerMiddleware();

export { authorizationByManagerMiddleware };
