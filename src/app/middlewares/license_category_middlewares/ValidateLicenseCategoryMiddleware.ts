import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { licenseCategoryValidator } from '../../validators/licenseCategoryValidator';
import { licenseCategoryFindAllService } from '../../services/license_category_services/LicenseCategoryFindAllService';

class ValidateLicenseCategoryMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { licenseCategory } = req.body;
      const { error } = licenseCategoryValidator.validate({ licenseCategory });
      const habilitation = ((await licenseCategoryFindAllService.findAll()).
        find(item => item.name === licenseCategory.toUpperCase())
      );

      if (!habilitation || error) {
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