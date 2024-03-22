import { Request, Response, NextFunction } from 'express';
import { customerFindAllService } from '../../services/customer_services/CustomerFindAllService';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../../helpers/createTemplate";

class FindAllCustomerController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await customerFindAllService.findAll();
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
            'customers.hbs'
          ));

          const template = handlebars.compile(caminhoTemplate);
          res.send(template({
            customers
          }));
        },
        'application/json': () => {
          res.send(customers);
        }
      })
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const findAllCustomerController = new FindAllCustomerController();

export { findAllCustomerController }