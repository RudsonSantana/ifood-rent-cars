import { Request, Response, NextFunction } from 'express';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../../helpers/createTemplate";
import { employeeFindAllService } from '../../services/employee_services/EmployeeFindAllService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class FindAllEmployeeController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const employees = await employeeFindAllService.findAll();
            res.status(StatusCodes.OK).format({
                'text/html': () => {
                    const caminhoTemplate = createTemplate(path.resolve(
                        __dirname,
                        '..',
                        '..',
                        '..',
                        'infra',
                        'templates',
                        'handlebars',
                        'employees.hbs'
                    ));
                    const template = handlebars.compile(caminhoTemplate);
                    res.send(template({
                        employees
                    }));
                },
                'application/json': () => {
                    res.send(employees);
                },

            })
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findAllEmployeeController = new FindAllEmployeeController();

export { findAllEmployeeController }