import { Router } from 'express';
import { createVehicleCategoryController } from '../controllers/vehicle_category_controllers/CreateVehicleCategoryController';
import { findAllVehicleCategoryController } from '../controllers/vehicle_category_controllers/FindAllVehicleCategoryController';
import { findByIdVehicleCategoryController } from '../controllers/vehicle_category_controllers/FindByIdVehicleCategoryController';
import { employeeAuthCookieMiddleware } from '../middlewares/employee_middlewares/EmployeeAuthCookieMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee_middlewares/AuthorizationForManagerMiddleware';
import { validateVehicleCategoryMiddleware } from '../middlewares/vehicle_category_middlewares/ValidateVehicleCategoryMiddleware';
import { validateVehicleCategoryParamsIdMiddleware } from '../middlewares/vehicle_category_middlewares/ValidateVehicleCategoryParamsIdMiddleware';

const vehicleCategoryRoutes = Router();

//Post
vehicleCategoryRoutes.post('/vehicleCategory',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    validateVehicleCategoryMiddleware.validate,
    createVehicleCategoryController.create
);

//Get
vehicleCategoryRoutes.get('/vehicleCategory',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    findAllVehicleCategoryController.findAll
);

vehicleCategoryRoutes.get('/vehicleCategory/:id',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    validateVehicleCategoryParamsIdMiddleware.validate,
    findByIdVehicleCategoryController.findById
);

export { vehicleCategoryRoutes };