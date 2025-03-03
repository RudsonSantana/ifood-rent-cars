import { IVehicleCategory, IVehicleCategoryRepository } from "../../../../app/interfaces/IVehicleCategory";
import { VehicleCategory } from "../models/vehicleCategory";

class VehicleCategoryRepository implements IVehicleCategoryRepository {
  async findAll(): Promise<IVehicleCategory[]> {
    const vehicleCategory = await VehicleCategory.findAll();
    return vehicleCategory.map(item => {
      return {
        id: item.dataValues.id,
        name: item.dataValues.name,
      }
    });
  }

  async findById(id: string): Promise<IVehicleCategory> {
    const vehicleCategory = await VehicleCategory.findByPk(id);
    if (vehicleCategory) {
      return {
        id: vehicleCategory.dataValues.id,
        name: vehicleCategory.dataValues.name,
      };
    } return null
  }

  async findByName(name: string): Promise<IVehicleCategory> {
    const vehicleCategory = await VehicleCategory.findOne({ where: { name: name } });
    if (vehicleCategory) {
      return {
        id: vehicleCategory.dataValues.id,
        name: vehicleCategory.dataValues.name,
      };
    } return null
  }


  async create(data: IVehicleCategory): Promise<void> {
    const vehicleCategory = await VehicleCategory.create({
      id: data.id,
      name: data.name,
    });
  }
}

const vehicleCategoryRepository = new VehicleCategoryRepository();

export { vehicleCategoryRepository };