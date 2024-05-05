import { employeePositionRepository } from "../../../infra/db/sequelize/repositories/employeePositionRepository"
import { v4 as uuidv4 } from 'uuid';

export interface EmployeePositionRequest {
    id: string,
    name: string,
}

class EmployeePositionCreateService {
    async create({
        position,
    }): Promise<EmployeePositionRequest> {
        const upperCaseName = position.toUpperCase();
        const newEmployeePosition = {
            id: uuidv4(),
            name: upperCaseName
        };
        await employeePositionRepository.create(newEmployeePosition);
        return newEmployeePosition;
    }
}

const employeePositionCreateService = new EmployeePositionCreateService();

export { employeePositionCreateService }