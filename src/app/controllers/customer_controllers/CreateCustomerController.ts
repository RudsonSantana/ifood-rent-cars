import { Request, Response, NextFunction } from 'express';
import { customerCreateService } from '../../services/customer_services/CustomerCreateService';
import { licenseCategoryFindAllService } from '../../services/license_category_services/LicenseCategoryFindAllService';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../../helpers/createTemplate";
import { StatusCodes} from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class CreateCustomerController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, cpf, email, password, phone, licenseCategory } = req.body;

            if (!name || !cpf || !email || !password || !phone || !licenseCategory) {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ error: 'Necessário fornecer todos os dados' });
                return next();
            }

            const upperCaseName = name.toUpperCase();
            const lowerCaseEmail = email.toLowerCase();
            const habilitation = (await licenseCategoryFindAllService.findAll()).find(item => item.name === licenseCategory.toUpperCase());

            if (habilitation) {
                const newCustomer = await customerCreateService.create({
                    name: upperCaseName,
                    cpf,
                    email: lowerCaseEmail,
                    password,
                    phone,
                    licenseCategory: habilitation.id
                });
                res.status(StatusCodes.CREATED).format({
                    'text/html': () => {
                        const caminhoTemplate = createTemplate(path.resolve(
                          __dirname,
                          '..',
                          '..',
                          '..',
                          'infra',
                          'templates',
                          'handlebars',
                          'customer.hbs'
                        ));
            
                        const template = handlebars.compile(caminhoTemplate);
                        res.send(template({
                          id: newCustomer.id,
                          name: newCustomer.name,
                          cpf: newCustomer.cpf,
                          email: newCustomer.email,
                          phone: newCustomer.phone,
                          licenseCategory: newCustomer.licenseCategory
            
                        }));
                      },
                    'application/json': () => {
                        res.send(newCustomer);
                    },
                });
            }
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const createCustomerController = new CreateCustomerController();

export { createCustomerController }