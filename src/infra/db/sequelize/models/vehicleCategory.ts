import { DataTypes } from "sequelize";
import { sequelize } from "..";

const VehicleCategory = sequelize.define('vehicle_categories', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true
    },
},
    {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
);

export { VehicleCategory }