import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import { encrypt } from '../../helpers/cryptHelper';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { IEmployeeRequest } from '../../interfaces/IEmployee';

class EmployeeCreateService {
  async create({
    name,
    cpf,
    email,
    password,
    phone,
    licenseCategory,
    position
  }): Promise<IEmployeeRequest> {
    const encryptPassword = encrypt(password);
    const cpfCripto = bcrypt.hashSync(cpf, 11);
    const newEmployee = {
      id: uuidv4(),
      name,
      cpf: cpfCripto,
      email,
      password: encryptPassword,
      phone,
      licenseCategory,
      position
    };
    await employeeRepository.create(newEmployee);
    return newEmployee;
  }
}

const employeeCreateService = new EmployeeCreateService();

export { employeeCreateService };