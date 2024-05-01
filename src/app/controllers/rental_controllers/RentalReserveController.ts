import { Request, Response, NextFunction } from 'express';
import { parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { customerFindByIdService } from '../../services/customer_services/CustomerFindByIdService';
import { vehicleFindByPlateService } from '../../services/vehicle_services/VehicleFindByPlateService';
import { rentalReserveService } from '../../services/rental_services/RentalReserveService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class RentalReserveController {
    async reserve(req: Request, res: Response, next: NextFunction) {
        try {
            const { customerId, vehiclePlate, startDate, endDate } = req.body;
            const status = "PENDING";

            if (!customerId || !vehiclePlate || !startDate || !endDate) {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ error: 'Necessário preencher todos os campos' });
                return next();
            }

            const customer = await customerFindByIdService.findById(customerId);
            if (!customer) {
                res.status(StatusCodes.NOT_FOUND).send({ error: 'Cliente não encontrado' });
                return next();
            }

            const vehicle = await vehicleFindByPlateService.findByPlate(vehiclePlate);
            if (!vehicle) {
                res.status(StatusCodes.NOT_FOUND).send({ error: 'Veículo não encontrado' });
                return next();
            }

            const formattedStartDate = parse(startDate, "dd-MM-yyyy HH:mm", new Date());
            const formattedEndDate = parse(endDate, 'dd-MM-yyyy HH:mm', new Date(), { locale: ptBR });
            const rental = await rentalReserveService.reserve(customer, vehicle, formattedStartDate, formattedEndDate, status);
            res.status(StatusCodes.CREATED).send(rental);
            next();
        } catch (error) {
            console.error(AppError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const rentalReserveController = new RentalReserveController();

export { rentalReserveController }