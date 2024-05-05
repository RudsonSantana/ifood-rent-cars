import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryFindByNameService } from '../../services/vehicle_category_services/VehicleCategoryFindByNameService';
import { vehicleCreateService } from '../../services/vehicle_services/VehicleCreateService';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../../helpers/createTemplate";
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class CreateVehicleController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { plate, manufacturer, model, year, kilometers, category, hourlyRate } = req.body;

      if (!plate || !manufacturer || !model || !year || !kilometers || !category || !hourlyRate) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ error: 'Necessário preencher todos os campos' });
        return next();
      }

      const vehicleCategory = await vehicleCategoryFindByNameService.findByName(category);

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
        res.status(StatusCodes.CREATED).format({
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
      console.error(AppError);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const createVehicleController = new CreateVehicleController();

export { createVehicleController };
