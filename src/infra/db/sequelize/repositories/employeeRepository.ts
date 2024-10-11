import { IEmployee, IEmployeeRepository } from '../../../../app/interfaces/IEmployee';
import { Employee } from '../models/employee';
import { EmployeePosition } from '../models/employeePosition';
import { LicenseCategory } from '../models/licenseCategory';
import bcrypt from 'bcrypt';

class EmployeeRepository implements IEmployeeRepository {
  async findAll(): Promise<IEmployee[]> {
    const employee = await Employee.findAll({
      include: [
        {
          model: LicenseCategory, 
          as: 'employeeLicenseCategory',
          attributes: ['id', 'name']
        },
        {
          model: EmployeePosition, 
          as: 'employeePosition',
          attributes: ['id', 'name']
        }
      ]
    });
    return employee.map(item => {
      return {
        id: item.dataValues.id,
        name: item.dataValues.name,
        cpf: item.dataValues.cpf,
        email: item.dataValues.email,
        password: item.dataValues.password,
        phone: item.dataValues.phone,
        licenseCategory: item.dataValues.employeeLicenseCategory.name,
        position: item.dataValues.employeePosition.name

      }
    });
  }

  async findById(id: string): Promise<IEmployee | null> {
    const employee = await Employee.findByPk(id, {
      include: [
        {
          model: LicenseCategory, 
          as: 'employeeLicenseCategory',
          attributes: ['id', 'name']
        },
        {
          model: EmployeePosition, 
          as: 'employeePosition',
          attributes: ['id', 'name']
        }
      ]
    });
    if (employee) {
      return {
        id: employee.dataValues.id,
        name: employee.dataValues.name,
        cpf: employee.dataValues.cpf,
        email: employee.dataValues.email,
        password: employee.dataValues.password,
        phone: employee.dataValues.phone,
        licenseCategory: employee.dataValues.licenseCategory,
        position: employee.dataValues.position
      }
    } return null;
  }

  async findByEmail(email: string): Promise<IEmployee | null> {
    const employee = await Employee.findOne({ where: { email: email } });
    if (employee) {
      return {
        id: employee.dataValues.id,
        name: employee.dataValues.name,
        cpf: employee.dataValues.cpf,
        email: employee.dataValues.email,
        password: employee.dataValues.password,
        phone: employee.dataValues.phone,
        licenseCategory: employee.dataValues.licenseCategory,
        position: employee.dataValues.position
      }
    } return null;
  }

  async findByCpf(cpf: string): Promise<IEmployee | null> {
    const employee = (await employeeRepository.findAll()).find(emp => {
      const compareCpf = bcrypt.compare(cpf, emp.cpf);
      if (compareCpf) {
        return emp;
      }
    });
    if (employee) {
      return {
        id: employee.id,
        name: employee.name,
        cpf: employee.cpf,
        email: employee.email,
        password: employee.password,
        phone: employee.phone,
        licenseCategory: employee.licenseCategory,
        position: employee.position
      }
    } return null;
  }

  async findByPosition(position: string): Promise<IEmployee | null> {
    const employee = await Employee.findByPk(position);
    if (employee) {
      return {
        id: employee.dataValues.id,
        name: employee.dataValues.name,
        cpf: employee.dataValues.cpf,
        email: employee.dataValues.email,
        password: employee.dataValues.password,
        phone: employee.dataValues.phone,
        licenseCategory: employee.dataValues.licenseCategory,
        position: employee.dataValues.position
      }
    } return null;
  }

  async create(data: IEmployee): Promise<void> {
    const employee = await Employee.create({
      id: data.id,
      name: data.name,
      cpf: data.cpf,
      email: data.email,
      password: data.password,
      phone: data.phone,
      licenseCategory: data.licenseCategory,
      position: data.position
    });
  }

  async passwordUpdate(employee: IEmployee, newPassword: string, confirmNewPassword: string): Promise<void> {
    if (newPassword === confirmNewPassword) {
      const employeeUpdate = await this.findById(employee.id);

      if (employeeUpdate) {
        employeeUpdate.password = confirmNewPassword;

        await this.updateEmployee(employeeUpdate);
      }
    }
  }

  private async updateEmployee(updatedEmployee: IEmployee): Promise<void> {
    await Employee.update(
      {
        password: updatedEmployee.password
      },
      {
        where: {
          id: updatedEmployee.id
        }
      }
    );
  }
}

const employeeRepository = new EmployeeRepository();

export { employeeRepository };