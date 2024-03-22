import { NextFunction, Request, Response, } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../../errors/AppError";

class EmployeeAuthCookieMiddleware {
    async auth(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token

            if (!token) {
                console.log('Token não encontrado');
                return res.redirect('/login/employee');
            }

            const secret = process.env.JWT_SECRET!;

            try {
                const decoded = jwt.verify(token, secret);
                if (!decoded) {
                    console.log('Token inválido');
                    return res.redirect('/login/employee');
                }
            } catch (error) {
                console.log('Erro ao verificar token:', error);
                return res.redirect('/login/employee');
            }
            
            req.headers = {
                token: token
            };

            next();
        } catch (error) {
            console.error(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const employeeAuthCookieMiddleware = new EmployeeAuthCookieMiddleware();

export { employeeAuthCookieMiddleware }