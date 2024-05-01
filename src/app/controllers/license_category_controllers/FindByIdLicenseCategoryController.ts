import { Request, Response, NextFunction } from 'express';
import { licenseCategoryFindByIdService } from '../../services/license_category_services/LicenseCategoryFindByIDService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class FindByIdLicenseCategoryController {
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const licenseCategory = await licenseCategoryFindByIdService.findById(id);

            if (licenseCategory) {
                res.status(StatusCodes.OK).send(licenseCategory);
            } else {
                res.status(StatusCodes.NOT_FOUND).send({ error: 'Licensa não encontrada' });
            }

        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findByIdLicenseCategoryController = new FindByIdLicenseCategoryController();

export { findByIdLicenseCategoryController }