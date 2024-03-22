import { Request, Response, NextFunction } from 'express';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../../helpers/createTemplate";
import { employeeFindByIdService } from '../../services/employee_services/EmployeeFindByIdService';

class FindByIdEmployeeController {
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const employeeId = req.params.id;
            const employee = await employeeFindByIdService.findById(employeeId);

            if (employee) {
                res.status(200).format({
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
                res.status(404).send({ error: 'Colaborador não encontrado' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findByIdEmployeeController = new FindByIdEmployeeController();

export { findByIdEmployeeController }