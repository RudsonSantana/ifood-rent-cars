import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryFindAllService } from '../../services/vehicles_category_services/VehicleCategoryFindAllService';
import { vehicleCreateService } from '../../services/vehicle_services/VehicleCreateService';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../../helpers/createTemplate";

class CreateVehicleController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { plate, manufacturer, model, year, kilometers, category, hourlyRate } = req.body;

      if (!plate || !manufacturer || !model || !year || !kilometers || !category || !hourlyRate) {
        res.status(400).send({ error: 'Necessário preencher todos os campos' });
        return next();
      }

      const vehicleCategory = (await vehicleCategoryFindAllService.findAll()).find(item => item.name === category.toUpperCase())

      if (vehicleCategory) {
        const newVehicle = await vehicleCreateService.create({
          plate,
          manufacturer,
          model,
          year,
          kilometers,
          category: vehicleCategory.id,
          hourlyRate,
          isAvailable: true
        });
        res.status(201).format({
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
                plate: newVehicle.plate,
                manufacturer: newVehicle.manufacturer,
                model: newVehicle.model,
                year: newVehicle.year,
                kilometers: newVehicle.kilometers,
                category: newVehicle.category,
                hourlyRate: newVehicle.hourlyRate
            }));
        },
          'application/json': () => {
            res.send(newVehicle);
          },
        })
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const createVehicleController = new CreateVehicleController();

export { createVehicleController };
