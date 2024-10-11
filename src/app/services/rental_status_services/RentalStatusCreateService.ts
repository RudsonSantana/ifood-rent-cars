import { rentalStatusRepository } from '../../../infra/db/sequelize/repositories/rentalStatusRepository';
import { v4 as uuidv4 } from 'uuid';
import { IRentalStatusRequest } from '../../interfaces/IRentalStatus';

class RentalStatusCreateService {
    async create({
        status,
    }): Promise<IRentalStatusRequest> {
        const newRentalStatus = {
            id: uuidv4(),
            status
        };
        await rentalStatusRepository.create(newRentalStatus);
        return newRentalStatus;
    }
}

const rentalStatusCreateService = new RentalStatusCreateService();

export { rentalStatusCreateService };