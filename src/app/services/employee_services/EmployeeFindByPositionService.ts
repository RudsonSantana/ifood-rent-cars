import { employeeRepository } from "../../../infra/db/sequelize/repositories/employeeRepository";

class EmployeeFindByPositionService {
    async findByPosition(position: string) {
        const employee = await employeeRepository.findByPosition(position);
        return employee
    }
}

const employeeFindByPositionService = new EmployeeFindByPositionService()

export { employeeFindByPositionService }