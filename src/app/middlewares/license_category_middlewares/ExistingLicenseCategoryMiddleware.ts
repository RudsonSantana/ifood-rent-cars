import { Request, Response, NextFunction } from 'express';
import { licenseCategoryFindByNameService } from '../../services/license_category_services/LicenseCategoryFindByNameService';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { licenseCategoryValidator } from '../../validators/licenseCategoryValidator';

class ExistingLicenseCategoryMiddleware {
  async existing(req: Request, res: Response, next: NextFunction) {
    try {
      const { licenseCategory } = req.body;
      const { error } = licenseCategoryValidator.validate({ licenseCategory })

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Habilitação inválida' });
      }

      const habilitation = await licenseCategoryFindByNameService.findByName(licenseCategory);

      if (!habilitation) {
        return res.status(StatusCodes.NOT_FOUND).send({ error: 'Habilitação inválida' });
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