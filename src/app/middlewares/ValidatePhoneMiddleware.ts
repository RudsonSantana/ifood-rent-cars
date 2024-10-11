import { Request, Response, NextFunction } from "express";
import { phoneValidator } from "../validators/phoneValidator";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/AppError";

class ValidatePhoneMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { phone } = req.body;
            const { error } = phoneValidator.validate({ phone });

            if (!phone || error) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'O telefone deve conter apenas números' })
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' })
            next(error);
        }
    }
}

const validatePhoneMiddleware = new ValidatePhoneMiddleware();

export { validatePhoneMiddleware }