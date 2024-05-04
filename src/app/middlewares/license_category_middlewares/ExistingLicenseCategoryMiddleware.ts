import { Request, Response, NextFunction } from 'express';
import { licenseCategoryRepository } from '../../../infra/db/sequelize/repositories/licenseCategoryRepository';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { licenseCategoryValidator } from '../../validators/licenseCategoryValidator';

class ExistingLicenseCategoryMiddleware {
  async existing(req: Request, res: Response, next: NextFunction) {
    try {
      const { licenseCategory } = req.body;
      const { error } = licenseCategoryValidator.validate({ licenseCategory })

      const habilitation = await licenseCategoryRepository.findByName(licenseCategory);

      if (!habilitation || error) {
        return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Habilitação inválida' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const existingLicenseCategoryMiddleware = new ExistingLicenseCategoryMiddleware();

export { existingLicenseCategoryMiddleware };