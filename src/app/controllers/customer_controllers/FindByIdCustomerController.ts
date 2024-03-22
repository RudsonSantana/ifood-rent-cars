import { Request, Response, NextFunction } from 'express';
import { customerFindByIdService } from '../../services/customer_services/CustomerFindByIdService';
import { createTemplate } from "../../helpers/createTemplate";
import path from 'path';
import handlebars from 'handlebars';

class FindByIdCustomerController {
  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.params.id;
      const customer = await customerFindByIdService.findById(customerId);

      if (customer) {
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
              'customer.hbs'
            ));

            const template = handlebars.compile(caminhoTemplate);
            res.send(template({
              id: customer.id,
              name: customer.name,
              cpf: customer.cpf,
              email: customer.email,
              phone: customer.phone,
              licenseCategory: customer.licenseCategory

            }));
          },
          'application/json': () => {
            res.send(customer);
          }
        })
      } else {
        res.status(404).send({ error: 'Cliente não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const findByIdCustomerController = new FindByIdCustomerController();

export { findByIdCustomerController }