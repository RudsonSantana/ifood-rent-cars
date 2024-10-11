import { employeeRepository } from "../../../infra/db/sequelize/repositories/employeeRepository";

class EmployeeFindByEmailService {
    async findByEmail(email: string) {
        const employee = await employeeRepository.findByEmail(email);
        return employee
    }
}

const employeeFindByEmailService = new EmployeeFindByEmailService()

export { employeeFindByEmailService }