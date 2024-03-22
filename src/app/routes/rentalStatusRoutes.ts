import { Router } from 'express';
import { createRentalStatusController } from '../controllers/rental_status_controllers/CreateRentalStatusController';
import { findAllRentalStatusController } from '../controllers/rental_status_controllers/FindAllRentalStatusController';
import { findByIdRentalStatusController } from '../controllers/rental_status_controllers/FindByIdRentalStatusController';
import { employeeAuthCookieMiddleware } from '../middlewares/employee_middlewares/EmployeeAuthCookieMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee_middlewares/AuthorizationForManagerMiddleware';
import { authorizationByAttendantMiddleware } from '../middlewares/employee_middlewares/AuthorizationForAttendantMiddleware';
import { validateRentalStatusParamsIdMiddleware } from '../middlewares/rental_status_middlewares/ExistingRentalStatusMiddleware';

const rentalStatusRoutes = Router();

//Post
rentalStatusRoutes.post('/rentalStatus',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    createRentalStatusController.create
);

//Get
rentalStatusRoutes.get('/rentalStatus',
    employeeAuthCookieMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    findAllRentalStatusController.findAll
);

rentalStatusRoutes.get('/rentalStatus/:id',
    employeeAuthCookieMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    validateRentalStatusParamsIdMiddleware.validate,
    findByIdRentalStatusController.findById
);

export { rentalStatusRoutes };