import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class ValidPlateFormatMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const plate = req.body.plate;

            const validPlateFormat = (plate: string): boolean => {
                const format1 = /^[A-Z]{3}\d[A-Z]\d{2}$/;
                const format2 = /^[A-Z]{3}\d{4}$/;

                return format1.test(plate) || format2.test(plate);
            };

            if (!validPlateFormat(plate)) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Formato de placa inválido' });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validPlateFormatMiddleware = new ValidPlateFormatMiddleware();

export { validPlateFormatMiddleware };