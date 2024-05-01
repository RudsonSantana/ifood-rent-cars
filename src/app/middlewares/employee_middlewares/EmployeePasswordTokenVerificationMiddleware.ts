import { NextFunction, Request, Response } from "express";
import { employeeRepository } from "../../../infra/db/sequelize/repositories/employeeRepository";
import jwt from 'jsonwebtoken';
import { AppError } from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

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
                    const employeeId = await employeeRepository.findById(id);
                    const employeeEmail = await employeeRepository.findByEmail(email);

                    const employeeCPF = await employeeRepository.findByCpf(cpf)
                    const compareCpf = cpf === employeeCPF.cpf

                    const employeePosition = await employeeRepository.findByPosition(position)
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