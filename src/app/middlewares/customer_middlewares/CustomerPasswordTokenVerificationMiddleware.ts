import { NextFunction, Request, Response } from "express";
import { customerRepository } from "../../../infra/db/sequelize/repositories/customerRepository";
import jwt from 'jsonwebtoken';
import { AppError } from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

class CustomerPasswordTokenVerificationMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token
            const secret = process.env.JWT_SECRET_2!;

            try {
                const decodedToken: any = jwt.verify(token, secret);
                const id = decodedToken.id;
                const email = decodedToken.email;
                const cpf = decodedToken.cpf;

                if (id && email && cpf) {
                    const customerId = await customerRepository.findById(id);
                    const customerEmail = await customerRepository.findByEmail(email);
                    const customer = await customerRepository.findByCpf(cpf)
                    const customerCPF = await cpf === await customer.cpf
    
                    if (!customerId || !customerEmail || !customerCPF) {
                        res.status(StatusCodes.UNAUTHORIZED).redirect('/password/customer/forgot');
                    }
    
                    return next();
                }

                if (!decodedToken) {
                    res.status(StatusCodes.UNAUTHORIZED).redirect('/password/customer/forgot');
                    return next();
                }
            } catch (error) {
                res.status(StatusCodes.UNAUTHORIZED).redirect('/password/customer/forgot');
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

const customerPasswordTokenVerificationMiddleware = new CustomerPasswordTokenVerificationMiddleware();

export { customerPasswordTokenVerificationMiddleware }