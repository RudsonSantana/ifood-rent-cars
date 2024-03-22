import { Router } from 'express';
import { createVehicleCategoryController } from '../controllers/vehicle_category_controllers/CreateVehicleCategoryController';
import { findAllVehicleCategoryController } from '../controllers/vehicle_category_controllers/FindAllVehicleCategoryController';
import { findByIdVehicleCategoryController } from '../controllers/vehicle_category_controllers/FindByIdVehicleCategoryController';
import { employeeAuthCookieMiddleware } from '../middlewares/employee_middlewares/EmployeeAuthCookieMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee_middlewares/AuthorizationForManagerMiddleware';

const vehicleCategoryRoutes = Router();

//Post
vehicleCategoryRoutes.post('/vehicleCategory',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
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
    findByIdVehicleCategoryController.findById
);

export { vehicleCategoryRoutes };