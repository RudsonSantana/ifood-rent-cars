import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryCreateService } from '../../services/vehicles_category_services/VehicleCategoryCreateService';

class CreateVehicleCategoryController {
    async create(req: Request, res: Response, next: NextFunction) {
      try {
        const { name } = req.body;
  
        if (!name) {
          res.status(400).send({ error: 'Necessário fornecer todos os dados' });
          return next();
        }
        
        const upperCaseName = name.toUpperCase();
        const newvehicleCategory = await vehicleCategoryCreateService.create({name: upperCaseName});
        res.status(201).send(newvehicleCategory);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
  }
  
  const createVehicleCategoryController = new CreateVehicleCategoryController();
  
  export { createVehicleCategoryController };