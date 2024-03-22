import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryFindByIdService } from '../../services/vehicles_category_services/VehicleCategoryFindByIdService';

class FindByIdVehicleCategoryController {
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
          const id = req.params.id;
          const vehicleCategory = await vehicleCategoryFindByIdService.findById(id);
    
          if (vehicleCategory) {
            res.send(vehicleCategory);
          } else {
            res.status(404).send({ error: 'Licensa não encontrada' });
          }
          
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: 'Erro interno do servidor' });
          next(error);
        }
      }
    
}

const findByIdVehicleCategoryController = new FindByIdVehicleCategoryController();

export { findByIdVehicleCategoryController }