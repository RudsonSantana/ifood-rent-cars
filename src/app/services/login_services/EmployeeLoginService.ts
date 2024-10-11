import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import { LoginRequest } from '../../interfaces/ILoginRequest';
import { encrypt } from "../../helpers/cryptHelper";
import jwt from 'jsonwebtoken';

class EmployeeLoginService {
    async login({ email, password }: LoginRequest) {
        const passwordProvided = encrypt(password);
        const employee = await employeeRepository.findByEmail(email);

        if (employee && employee.password === passwordProvided) {
            const secret = process.env.JWT_SECRET!;

            const accessToken = jwt.sign(
                {
                    id: employee.id,
                    name: employee.name,
                    email: employee.email,
                    position: employee.position
                },
                secret,
                { expiresIn: '1h' }
            );

            return { accessToken };
        }
    }
}

const employeeLoginService = new EmployeeLoginService();

export { employeeLoginService }