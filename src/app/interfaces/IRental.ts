import { ICustomer } from "./ICustomer";
import { IVehicle } from "./IVehicle";

export interface IRental {
    id: string;
    customer: string;
    vehicle: string;
    startDate: string;
    endDate: string;
    rentalDays: number;
    rentalAmount: number;
    status: string;
}

export interface IRentalRepository {
    findAll(): Promise<IRental[]>;
    findById(id: string): Promise<IRental | null>;
    findRentalsByCustomer(customerId: string): Promise<IRental | null>;
    findRentalsByPlate(plate: string): Promise<IRental | null>;
    create(data: IRental): Promise<void>;
    updateRentalStatus(id: string, newStatus: string): Promise<void>;
    updateRentalStartDate(id: string, newStartDate: Date): Promise<void>;
    updateRentalEndDate(id: string, newEndDate: Date): Promise<void>;
}