import { DataTypes } from "sequelize";
import { sequelize } from "..";

const RentalStatus = sequelize.define('rental_status', {
  id: {
    type: DataTypes.STRING(36),
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING(20),
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

export { RentalStatus };