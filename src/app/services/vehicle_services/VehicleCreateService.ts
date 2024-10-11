import { vehicleRepository } from "../../../infra/db/sequelize/repositories/vehicleRepository";
import { IVehicleRequest } from "../../interfaces/IVehicle";

class VehicleCreateService {
async create({
    plate,
    manufacturer,
    model,
    year,
    kilometers,
    category,
    hourlyRate,
    isAvailable

  }): Promise<IVehicleRequest> {
    const newVehicle = {
      plate,
      manufacturer,
      model,
      year,
      kilometers,
      category,
      hourlyRate,
      isAvailable
    };
    await vehicleRepository.create(newVehicle);
    return newVehicle;
  }

}

const vehicleCreateService = new VehicleCreateService();

export { vehicleCreateService };