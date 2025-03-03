import { Router } from 'express';
import { createEmployeePositionController } from '../controllers/employee_position_controllers/CreateEmployeePositionController';
import { findAllEmployeePositionController } from '../controllers/employee_position_controllers/FindAllEmployeePositionController';
import { findByIdEmployeePositionController } from '../controllers/employee_position_controllers/FindByIdEmployeePositionController';
import { employeeAuthCookieMiddleware } from '../middlewares/employee_middlewares/EmployeeAuthCookieMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee_middlewares/AuthorizationForManagerMiddleware';
import { validateEmployeePositionMiddleware } from '../middlewares/employee_position_middleware/ValidateEmployeePositionMiddleware';


const employeePositionRoutes = Router();

//Post
employeePositionRoutes.post('/employeePosition',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    validateEmployeePositionMiddleware.validate,
    createEmployeePositionController.create
);

//Get
employeePositionRoutes.get('/employeePosition',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    findAllEmployeePositionController.findAll
);

employeePositionRoutes.get('/employeePosition/:id',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    findByIdEmployeePositionController.findById
);

export { employeePositionRoutes };