import jwt from 'jsonwebtoken';
import { encrypt } from "../../helpers/cryptHelper";
import { customerRepository } from '../../../infra/db/sequelize/repositories/customerRepository';
import { LoginRequest } from '../../interfaces/ILoginRequest';

class CustomerLoginService {
  async login({ email, password }: LoginRequest) {
    const passwordProvided = encrypt(password)
    const customer = await customerRepository.findByEmail(email);

    if (customer && customer.password === passwordProvided) {
      const secret = process.env.JWT_SECRET!;

      const accessToken = jwt.sign(
        {
          id: customer.id,
          name: customer.name,
          email: customer.email
        },
        secret,
        { expiresIn: '1d' }
      );

      return { accessToken };
    }
  }
}

const customerLoginService = new CustomerLoginService();

export { customerLoginService }