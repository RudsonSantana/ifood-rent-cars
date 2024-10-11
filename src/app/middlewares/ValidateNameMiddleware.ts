import { Request, Response, NextFunction } from "express";
import { nameValidator } from "../validators/nameValidator";
import { AppError } from "../errors/AppError";
import { StatusCodes } from "http-status-codes";

class ValidateNameMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            const { error } = nameValidator.validate({ name });

            if (!name || error) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Nome inválido. Nome deve conter apenas letras' });
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do Servidor' })
            next(error);
        }
    }
}

const validateNameMiddleware = new ValidateNameMiddleware();

export { validateNameMiddleware }