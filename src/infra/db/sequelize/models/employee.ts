import { DataTypes } from "sequelize";
import { sequelize } from "..";
import { LicenseCategory } from "./licenseCategory";
import { EmployeePosition } from "./employeePosition";

const Employee = sequelize.define('employees', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licenseCategory: {
        type: DataTypes.STRING(36),
        references: {
            model: 'license_categories',
            key: 'id'
        }
    },
    position: {
        type: DataTypes.STRING(36),
        references: {
            model: 'employee_positions',
            key: 'id'
        }
    }
},
    {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
);

Employee.belongsTo(LicenseCategory, { foreignKey: 'licenseCategory', as: 'employeeLicenseCategory'});
Employee.belongsTo(EmployeePosition, { foreignKey: 'position', as: 'employeePosition' });

export { Employee };