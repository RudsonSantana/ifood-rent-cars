import { Request, Response, NextFunction } from 'express';
import { licenseCategoryFindByIdService } from '../../services/license_category_services/LicenseCategoryFindByIdService';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { idValidator } from '../../validators/idValidator';

class ValidateLicenseCategoryParamsIdMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { error } = idValidator.validate(req.params);

            if (error) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Posição Inválida!' });
            }
            
            const id = req.params.id;
            const licenseCategory = await licenseCategoryFindByIdService.findById(id);

            if (!licenseCategory) {
                return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Categoria de Licença inválida!' });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor!' });
            next(error);
        }
    }
}

const validateLicenseCategoryParamsIdMiddleware = new ValidateLicenseCategoryParamsIdMiddleware();

export { validateLicenseCategoryParamsIdMiddleware }