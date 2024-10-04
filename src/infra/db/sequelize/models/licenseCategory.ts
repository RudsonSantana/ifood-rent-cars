import { DataTypes } from 'sequelize'
import { sequelize } from '..'

const LicenseCategory = sequelize.define('license_categories', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(2),
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

export { LicenseCategory };