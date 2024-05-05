import { vehicleCategoryRepository } from '../../../infra/db/sequelize/repositories/vehicleCategoryRepository';
import { v4 as uuidv4 } from 'uuid';

export interface VehicleCategoryRequest {
    id: string,
    name: string,
}

class VehicleCategoryCreateService {
    async create({
        category
    }): Promise<VehicleCategoryRequest> {
        const upperCaseName = category.toUpperCase();
        const newVehicleCategory = {
            id: uuidv4(),
            name: upperCaseName
        };
        await vehicleCategoryRepository.create(newVehicleCategory);
        return newVehicleCategory;
    }
}

const vehicleCategoryCreateService = new VehicleCategoryCreateService();

export { vehicleCategoryCreateService };