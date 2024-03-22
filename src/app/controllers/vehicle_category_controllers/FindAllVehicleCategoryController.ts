import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryFindAllService } from '../../services/vehicles_category_services/VehicleCategoryFindAllService';

class FindAllVehicleCategoryController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const vehicleCategories = await vehicleCategoryFindAllService.findAll();
            res.send(vehicleCategories);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const findAllVehicleCategoryController = new FindAllVehicleCategoryController();

export { findAllVehicleCategoryController }