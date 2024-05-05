import { Request, Response, NextFunction } from 'express';
import { licenseCategoryFindByNameService } from '../../services/license_category_services/LicenseCategoryFindByNameService';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { licenseCategoryValidator } from '../../validators/licenseCategoryValidator';

class ValidateLicenseCategoryMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const { error } = licenseCategoryValidator.validate({ name });

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Habilitação inválida!' });
      }

      const licenseCategory = await licenseCategoryFindByNameService.findByName(name);

      if (licenseCategory) {
        return res.status(StatusCodes.CONFLICT).send({ error: 'Habilitação já cadastrada!' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor!' });
      next(error);
    }
  }
}

const validateLicenseCategoryMiddleware = new ValidateLicenseCategoryMiddleware();

export { validateLicenseCategoryMiddleware };