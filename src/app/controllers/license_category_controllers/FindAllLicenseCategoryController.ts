import { Request, Response, NextFunction } from 'express';
import { licenseCategoryFindAllService } from '../../services/license_category_services/LicenseCategoryFindAllService';

class FindAllLicenseCategoryController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const licenseCategories = await licenseCategoryFindAllService.findAll();
            res.send(licenseCategories);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findAllLicenseCategoryController = new FindAllLicenseCategoryController();

export { findAllLicenseCategoryController }