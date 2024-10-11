import { Request, Response, NextFunction } from 'express';
import { passwordValidator } from '../validators/passwordValidator';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';

class ValidatePasswordMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { password } = req.body
            const { error } = passwordValidator.validate({ password });

            if (!password || error) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Senha deve ter no mínimo 6 e no máximo 20 caracteres, com uma letra maiúscula, uma letra minúscula, um número e um caracter especial' })
            }

            next()

        } catch (error) {
            console.log(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }

    }
}

const validatePasswordMiddleware = new ValidatePasswordMiddleware();

export { validatePasswordMiddleware }