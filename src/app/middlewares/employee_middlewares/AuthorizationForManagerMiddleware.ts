import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import { AppError } from '../../errors/AppError';
import { employeePositionRepository } from '../../../infra/db/sequelize/repositories/employeePositionRepository';

class AuthorizationByManagerMiddleware {
    async authorization(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token;
            const secret = process.env.JWT_SECRET!;
            const decodedToken: any = jwt.verify(token, secret);

            const positionDecoded = decodedToken.position;
            const idDecoded = decodedToken.id;

            const employee = await employeeRepository.findById(idDecoded);
            const position = await employeePositionRepository.findById(positionDecoded);

            if (!employee || !position) {
                return res.status(400).send({ error: 'Usuário não autorizado!' });
            }

            if (employee.position !== positionDecoded || employee.position !== position.id || position.name.toUpperCase() !== 'MANAGER') {
                return res.status(400).send({ error: 'Usuário não autorizado!' });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const authorizationByManagerMiddleware = new AuthorizationByManagerMiddleware();

export { authorizationByManagerMiddleware };
