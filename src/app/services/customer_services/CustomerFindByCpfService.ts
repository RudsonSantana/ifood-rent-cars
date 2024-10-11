import { customerRepository } from "../../../infra/db/sequelize/repositories/customerRepository";

class CustomerFindByCpfService {
    async findByCpf(cpf: string) {
        const customer = await customerRepository.findByCpf(cpf);
        return customer
    }
}

const customerFindByCpfService = new CustomerFindByCpfService();

export { customerFindByCpfService }