import { DataTypes } from "sequelize";
import { sequelize } from "..";

const EmployeePosition = sequelize.define('employee_positions', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    }
},
    {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
);

export { EmployeePosition };