import { Request, Response, NextFunction } from 'express';
import { licenseCategoryFindByIdService } from '../../services/license_category_services/LicenseCategoryFindByIDService';

class FindByIdLicenseCategoryController {
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const licenseCategory = await licenseCategoryFindByIdService.findById(id);

            if (licenseCategory) {
                res.send(licenseCategory);
            } else {
                res.status(404).send({ error: 'Licensa não encontrada' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findByIdLicenseCategoryController = new FindByIdLicenseCategoryController();

export { findByIdLicenseCategoryController }