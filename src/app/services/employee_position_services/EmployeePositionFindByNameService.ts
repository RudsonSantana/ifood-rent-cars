import { employeePositionRepository } from "../../../infra/db/sequelize/repositories/employeePositionRepository";

class EmployeePositionFindByNameService {
    async findByName(name: string) {
        const employeePosition = await employeePositionRepository.findByName(name);
        return employeePosition;
    }
}

const employeePositionFindByNameService = new EmployeePositionFindByNameService();

export { employeePositionFindByNameService };