import { Request, Response, NextFunction } from 'express';
import { licenseCategoryCreateService } from '../../services/license_category_services/LicenseCategoryCreateService';

class CreateLicenseCategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      if (!name) {
        res.status(400).send({ error: 'Necessário fornecer todos os dados' });
        return next();
      }

      const upperCaseName = name.toUpperCase();
      const newLicenseCategory = await licenseCategoryCreateService.create({ name: upperCaseName });
      res.status(201).send(newLicenseCategory);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const createLicenseCategoryController = new CreateLicenseCategoryController();

export { createLicenseCategoryController }