import { Request, Response, NextFunction } from 'express';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../../helpers/createTemplate";
import { vehicleFindAllService } from '../../services/vehicle_services/VehicleFindAllService';

class FindAllVehicleController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const vehicles = await vehicleFindAllService.findAll();
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
                        'vehicles.hbs'
                    ));

                    const template = handlebars.compile(caminhoTemplate);
                    res.send(template({
                        vehicles
                    }));
                },
                'application/json': () => {
                    res.send(vehicles);
                },
            })
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findAllVehicleController = new FindAllVehicleController();

export { findAllVehicleController }