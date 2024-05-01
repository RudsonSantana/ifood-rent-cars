import { NextFunction, Request, Response, } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

class CustomerAuthCookieMiddleware {
    async auth(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token

            if (!token) {
                return res.status(StatusCodes.UNAUTHORIZED).redirect('/login/customer');
            }

            const secret = process.env.JWT_SECRET!;

            try {
                const decoded = jwt.verify(token, secret);
                if (!decoded) {
                    return res.status(StatusCodes.UNAUTHORIZED).redirect('/login/customer');
                }
            } catch (error) {
                return res.status(StatusCodes.UNAUTHORIZED).redirect('/login/customer');
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const customerAuthCookieMiddleware = new CustomerAuthCookieMiddleware();

export { customerAuthCookieMiddleware }