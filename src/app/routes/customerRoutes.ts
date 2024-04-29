import { Router, Request, Response } from 'express';
import { findByIdCustomerController } from '../controllers/customer_controllers/FindByIdCustomerController';
import { findAllCustomerController } from '../controllers/customer_controllers/FindAllCustomerController';
import { createCustomerController } from '../controllers/customer_controllers/CreateCustomerController';
import { validateCustomerCpfMiddleware } from '../middlewares/customer_middlewares/ValidateCustomerCpfMiddleware';
import { validateCustomerEmailMiddleware } from '../middlewares/customer_middlewares/ValidateCustomerEmailMiddleware';
import { validateLicenseCategoryMiddleware } from '../middlewares/license_category_middlewares/ValidateLicenseCategoryMiddleware';
import { authorizationByAttendantMiddleware } from '../middlewares/employee_middlewares/AuthorizationForAttendantMiddleware';
import { validateCustomerParamsIdMiddleware } from '../middlewares/customer_middlewares/ValidateCustomerParamsIdMiddleware';
import { employeeAuthCookieMiddleware } from '../middlewares/employee_middlewares/EmployeeAuthCookieMiddleware';
import path from 'path';
import { customerAuthCookieMiddleware } from '../middlewares/customer_middlewares/CustomerAuthCookieMiddleware';
import { customerTokenVerificationMiddleware } from '../middlewares/customer_middlewares/CustomerTokenVerificationMiddleware';


const customerRoutes = Router();

//Post
customerRoutes.get('/customer',
    (req: Request, res: Response) => {
        const caminho = path.resolve(__dirname, '..', 'views', 'customer.ejs');
        res.render(caminho);
    });

customerRoutes.post('/customers',
    validateCustomerCpfMiddleware.validate,
    validateCustomerEmailMiddleware.validate,
    validateLicenseCategoryMiddleware.validate,
    createCustomerController.create
);

// Get
customerRoutes.get('/customers/all',
    employeeAuthCookieMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    findAllCustomerController.findAll
);

customerRoutes.get('/customers/:id',
    customerAuthCookieMiddleware.auth,
    validateCustomerParamsIdMiddleware.validate,
    findByIdCustomerController.findById
);

export { customerRoutes };