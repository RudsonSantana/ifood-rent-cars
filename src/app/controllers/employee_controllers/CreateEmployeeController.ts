import { Request, Response, NextFunction } from 'express';
import { licenseCategoryFindAllService } from '../../services/license_category_services/LicenseCategoryFindAllService';
import { employeePositionFindAllService } from '../../services/employee_position_services/EmployeePositionFindAllService';
import { employeeCreateService } from '../../services/employee_services/EmployeeCreateService';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../../helpers/createTemplate";
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class CreateEmployeeController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, cpf, email, password, phone, licenseCategory, position } = req.body;

      if (!name || !cpf || !email || !password || !phone || !licenseCategory || !position) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ error: 'Necessário fornecer todos os dados' });
        return next();
      }

      const upperCaseName = name.toUpperCase();
      const lowerCaseEmail = email.toLowerCase();
      const habilitation = (await licenseCategoryFindAllService.findAll()).find(item => item.name === licenseCategory.toUpperCase());
      const employeePosition = (await employeePositionFindAllService.findAll()).find(item => item.name === position.toUpperCase());

      if (habilitation && employeePosition) {
        const newEmployee = await employeeCreateService.create({
          name: upperCaseName,
          cpf,
          email: lowerCaseEmail,
          password,
          phone,
          licenseCategory: habilitation.id,
          position: employeePosition.id
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
                'employee.hbs'
            ));

            const template = handlebars.compile(caminhoTemplate);
            res.send(template({
                id: newEmployee.id,
                name: newEmployee.name,
                cpf: newEmployee.cpf,
                email: newEmployee.email,
                phone: newEmployee.phone,
                licenseCategory: newEmployee.licenseCategory,
                position: newEmployee.position
            }));
        },
          'application/json': () => {
            res.send(newEmployee);
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

const createEmployeeController = new CreateEmployeeController();

export { createEmployeeController }