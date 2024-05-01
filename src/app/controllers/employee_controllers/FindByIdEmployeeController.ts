import { Request, Response, NextFunction } from 'express';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../../helpers/createTemplate";
import { employeeFindByIdService } from '../../services/employee_services/EmployeeFindByIdService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class FindByIdEmployeeController {
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const employeeId = req.params.id;
            const employee = await employeeFindByIdService.findById(employeeId);

            if (employee) {
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
                            'employee.hbs'
                        ));

                        const template = handlebars.compile(caminhoTemplate);
                        res.send(template({
                            id: employee.id,
                            name: employee.name,
                            cpf: employee.cpf,
                            email: employee.email,
                            phone: employee.phone,
                            licenseCategory: employee.licenseCategory,
                            position: employee.position
                        }));
                    },
                    'application/json': () => {
                        res.send(employee);
                    },
                })
            } else {
                res.status(StatusCodes.NOT_FOUND).send({ error: 'Colaborador não encontrado' });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findByIdEmployeeController = new FindByIdEmployeeController();

export { findByIdEmployeeController }