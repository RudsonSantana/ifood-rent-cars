import { Request, Response, NextFunction } from 'express';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../../helpers/createTemplate";
import { vehicleFindByPlateService } from '../../services/vehicle_services/VehicleFindByPlateService';

class FindByPlateVehicleController {
    async findByPlate(req: Request, res: Response, next: NextFunction) {
        try {
            const plate = req.params.plate;
            const vehicle = await vehicleFindByPlateService.findByPlate(plate);

            if (vehicle) {
                res.status(200).format({
                    'text/html': () => {
                        const caminhoTemplate = createTemplate(path.resolve(
                            __dirname,
                            '..',
                            '..',
                            '..',
                            'infra',
                            'templates',
                            'handlebars',
                            'vehicle.hbs'
                        ));

                        const template = handlebars.compile(caminhoTemplate);
                        res.send(template({
                            plate: vehicle.plate,
                            manufacturer: vehicle.manufacturer,
                            model: vehicle.model,
                            year: vehicle.year,
                            kilometers: vehicle.kilometers,
                            category: vehicle.category,
                            hourlyRate: vehicle.hourlyRate
                        }));
                    },
                    'application/json': () => {
                        res.send(vehicle);
                    },
                })
            } else {
                res.status(404).send({ error: 'Veículo não encontrado' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findByPlateVehicleController = new FindByPlateVehicleController();

export { findByPlateVehicleController }