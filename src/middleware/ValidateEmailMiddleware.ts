import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../repositories/CustomerRepository';

class ValidateEmailMiddleware {
  async validateEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    try {
      const existingCustomer = customerRepository.getAllCustomers().find(
        (customer) => customer.email === email
      );

      if (existingCustomer) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

const validateEmailMiddleware = new ValidateEmailMiddleware();

export { validateEmailMiddleware };