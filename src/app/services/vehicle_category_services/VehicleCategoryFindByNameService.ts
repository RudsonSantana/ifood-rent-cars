import { vehicleCategoryRepository } from "../../../infra/db/sequelize/repositories/vehicleCategoryRepository";

class VehicleCategoryFindByNameService {
    async findByName(name: string) {
        const vehicleCategory = await vehicleCategoryRepository.findByName(name);
        return vehicleCategory
    }
}

const vehicleCategoryFindByNameService = new VehicleCategoryFindByNameService();

export { vehicleCategoryFindByNameService }