import { IRentalStatus, IRentalStatusRepository } from "../../../../app/repositories/rentalStatusRepository";
import { RentalStatus } from "../models/rentalStatus";

class RentalStatusRepository implements IRentalStatusRepository {
  async findAll(): Promise<IRentalStatus[]> {
    const rentalStatus = await RentalStatus.findAll();
    return rentalStatus.map(item => {
      return {
        id: item.dataValues.id,
        status: item.dataValues.status,
      }
    });
  }

  async findById(id: string): Promise<IRentalStatus> {
    const rentalStatus = await RentalStatus.findByPk(id);
    if (rentalStatus) {
      return {
        id: rentalStatus.dataValues.id,
        status: rentalStatus.dataValues.status,
      };
    } return null
  }

  async create(data: IRentalStatus): Promise<void> {
    const rentalStatus = await RentalStatus.create({
      id: data.id,
      status: data.status,
    });
  }
}

const rentalStatusRepository = new RentalStatusRepository();

export { rentalStatusRepository };