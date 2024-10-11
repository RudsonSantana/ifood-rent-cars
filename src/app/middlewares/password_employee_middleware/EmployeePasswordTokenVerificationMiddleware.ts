import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { employeeFindByIdService } from "../../services/employee_services/EmployeeFindByIdService";
import { employeeFindByEmailService } from "../../services/employee_services/EmployeeFindByEmailService";
import { employeeFindByCpfService } from "../../services/employee_services/EmployeeFindByCpfService";
import { employeeFindByPositionService } from "../../services/employee_services/EmployeeFindByPositionService";


class EmployeePasswordTokenVerificationMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const accessToken = req.cookies.token
            const secret = process.env.JWT_SECRET_2!;

            try {
                const decodedToken: any = jwt.verify(accessToken, secret);

                const id = decodedToken.id;
                const email = decodedToken.email;
                const cpf = decodedToken.cpf;
                const position = decodedToken.position;

                if (id && email && cpf && position) {
                    const employeeId = await employeeFindByIdService.findById(id);
                    const employeeEmail = await employeeFindByEmailService.findByEmail(email);

                    const employeeCPF = await employeeFindByCpfService.findByCpf(cpf)
                    const compareCpf = cpf === employeeCPF.cpf

                    const employeePosition = await employeeFindByPositionService.findByPosition(position)
                    const comparePosition = await position === employeePosition.position

                    if (!employeeId || !employeeEmail || !compareCpf || !comparePosition) {
                        res.status(StatusCodes.BAD_REQUEST).redirect('/password/employee/forgot');
                        return next();
                    }

                    next();
                }
            } catch (error) {
                res.status(StatusCodes.UNAUTHORIZED).redirect('/password/employee/forgot');
                return next();
            }

        }
        catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const employeePasswordTokenVerificationMiddleware = new EmployeePasswordTokenVerificationMiddleware();

export { employeePasswordTokenVerificationMiddleware }