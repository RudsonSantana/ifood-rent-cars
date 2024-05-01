import { Request, Response, NextFunction } from 'express';
import { licenseCategoryRepository } from '../../../infra/db/sequelize/repositories/licenseCategoryRepository';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class ValidateLicenseCategoryMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { licenseCategory } = req.body;
      const habilitation = ((await licenseCategoryRepository.findAll()).
        find(item => item.name === licenseCategory.toUpperCase())
      );

      if (!habilitation) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Habilitação inválida' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const validateLicenseCategoryMiddleware = new ValidateLicenseCategoryMiddleware();

export { validateLicenseCategoryMiddleware };