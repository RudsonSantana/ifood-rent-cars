import { Request, Response, NextFunction } from 'express';
import { licenseCategoryRepository } from '../../../infra/db/sequelize/repositories/licenseCategoryRepository';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { licenseCategoryValidator } from '../../validators/licenseCategoryValidator';

class ValidateLicenseCategoryMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const { error } = licenseCategoryValidator.validate({ name })
      const licenseCategory = await licenseCategoryRepository.findByName(name);

      if (licenseCategory) {
        return res.status(StatusCodes.CONFLICT).send({ error: 'Habilitação já cadastrada!' });
      }

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Habilitação inválida!' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const validateLicenseCategoryMiddleware = new ValidateLicenseCategoryMiddleware();

export { validateLicenseCategoryMiddleware };