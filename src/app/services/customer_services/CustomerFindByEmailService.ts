import { customerRepository } from "../../../infra/db/sequelize/repositories/customerRepository";

class CustomerFindByEmailService {
    async findByEmail(email: string) {
        const customer = await customerRepository.findByEmail(email);
        return customer
    }
}

const customerFindByEmailService = new CustomerFindByEmailService();

export { customerFindByEmailService }