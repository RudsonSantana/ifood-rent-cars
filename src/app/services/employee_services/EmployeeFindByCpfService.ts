import { employeeRepository } from "../../../infra/db/sequelize/repositories/employeeRepository";

class EmployeeFindByCpfService {
    async findByCpf(cpf: string) {
        const employee = await employeeRepository.findByCpf(cpf);
        return employee
    }
}

const employeeFindByCpfService = new EmployeeFindByCpfService()

export { employeeFindByCpfService }