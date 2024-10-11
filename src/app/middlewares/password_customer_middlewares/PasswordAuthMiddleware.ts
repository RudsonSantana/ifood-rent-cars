import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

class PasswordAuthMiddleware {
  execute(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.header('Authorization');

      if (!authorizationHeader) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Token não informado' });
      }

      if (!authorizationHeader.toLocaleLowerCase().startsWith('bearer ')) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Token não informado' });
      }

      const accessToken = authorizationHeader.split(' ')[1];

      const secret = process.env.JWT_SECRET_2!;

      try {
        jwt.verify(accessToken, secret);
      } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Token Inválido' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const passwordAuthMiddleware = new PasswordAuthMiddleware();

export { passwordAuthMiddleware }