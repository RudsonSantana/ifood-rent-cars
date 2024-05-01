import { Request, Response, NextFunction } from 'express';
import { licenseCategoryFindAllService } from '../../services/license_category_services/LicenseCategoryFindAllService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class FindAllLicenseCategoryController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const licenseCategories = await licenseCategoryFindAllService.findAll();
            res.status(StatusCodes.OK).send(licenseCategories);
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findAllLicenseCategoryController = new FindAllLicenseCategoryController();

export { findAllLicenseCategoryController }