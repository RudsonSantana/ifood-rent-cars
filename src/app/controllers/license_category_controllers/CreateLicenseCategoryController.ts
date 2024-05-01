import { Request, Response, NextFunction } from 'express';
import { licenseCategoryCreateService } from '../../services/license_category_services/LicenseCategoryCreateService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class CreateLicenseCategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      if (!name) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ error: 'Necessário fornecer todos os dados' });
        return next();
      }

      const upperCaseName = name.toUpperCase();
      const newLicenseCategory = await licenseCategoryCreateService.create({ name: upperCaseName });
      res.status(StatusCodes.CREATED).send(newLicenseCategory);
    } catch (error) {
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const createLicenseCategoryController = new CreateLicenseCategoryController();

export { createLicenseCategoryController }