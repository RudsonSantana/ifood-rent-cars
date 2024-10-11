import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { licenseCategoryFindByIdService } from '../../services/license_category_services/LicenseCategoryFindByIdService';


class ValidateLicenseCategoryParamsIdMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const licenseCategory = await licenseCategoryFindByIdService.findById(id);

            if (!licenseCategory) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Categoria de Licença inválida!' });
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateLicenseCategoryParamsIdMiddleware = new ValidateLicenseCategoryParamsIdMiddleware();

export { validateLicenseCategoryParamsIdMiddleware }