import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

class CustomerAuthCookieMiddleware {
  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token;
      const authorization = req.header('Authorization');

      if (!token || !authorization || !authorization.toLocaleLowerCase().startsWith('bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).format({
          "text/html": () => {
            res.redirect("/login/customer");
          },
          "application/json": () => {
            res.send({ error: "Usuário não autorizado" });
          },
        });
      }
      
      const accessToken = authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET!;

      try {
        const decoded = jwt.verify(token || accessToken, secret);
        if (!decoded) {
          return res.status(StatusCodes.UNAUTHORIZED).format({
            "text/html": () => {
              res.redirect("/login/customer");
            },
            "application/json": () => {
              res.send({ error: "Usuário não autorizado" });
            },
          });
        }
      } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).format({
          "text/html": () => {
            res.redirect("/login/customer");
          },
          "application/json": () => {
            res.send({ error: "Usuário não autorizado" });
          },
        });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro interno do servidor" });
      next(error);
    }
  }
}

const customerAuthCookieMiddleware = new CustomerAuthCookieMiddleware();

export { customerAuthCookieMiddleware };
