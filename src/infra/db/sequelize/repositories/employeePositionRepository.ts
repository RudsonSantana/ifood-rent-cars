import { IEmployeePosition, IEmployeePositionRepository } from "../../../../app/interfaces/IemployeePosition";
import { EmployeePosition } from "../models/employeePosition";

class EmployeePositionRepository implements IEmployeePositionRepository {
    async findAll(): Promise<IEmployeePosition[]> {
      const employeePosition = await EmployeePosition.findAll();
      return employeePosition.map(item => {
        return {
          id: item.dataValues.id,
          name: item.dataValues.name,
        }
      });
    }
  
    async findById(id: string): Promise<IEmployeePosition> {
      const employeePosition = await EmployeePosition.findByPk(id);
      if (employeePosition) {
        return {
          id: employeePosition.dataValues.id,
          name: employeePosition.dataValues.name,
        };
      } return null
    }

    async findByName(name: string): Promise<IEmployeePosition> {
      const employeePosition = await EmployeePosition.findOne({ where: { name: name } });
      if (employeePosition) {
        return {
          id: employeePosition.dataValues.id,
          name: employeePosition.dataValues.name,
        };
      } return null
    }

    async create(data: IEmployeePosition): Promise<void> {
        const employeePosition = await EmployeePosition.create({
          id: data.id,
          name: data.name,
        });
    }
}

const employeePositionRepository = new EmployeePositionRepository();

export { employeePositionRepository };