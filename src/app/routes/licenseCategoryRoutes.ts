import { Router } from 'express';
import { createLicenseCategoryController } from '../controllers/license_category_controllers/CreateLicenseCategoryController';
import { findAllLicenseCategoryController } from '../controllers/license_category_controllers/FindAllLicenseCategoryController';
import { findByIdLicenseCategoryController } from '../controllers/license_category_controllers/FindByIdLicenseCategoryController';
import { employeeAuthCookieMiddleware } from '../middlewares/employee_middlewares/EmployeeAuthCookieMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee_middlewares/AuthorizationForManagerMiddleware';
import { validateLicenseCategoryParamsIdMiddleware } from '../middlewares/license_category_middlewares/ValidateLicenseCategoryParamsIdMiddleware';

const licenseCategoryRoutes = Router();

//Post
licenseCategoryRoutes.post('/licenseCategory',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    createLicenseCategoryController.create
);

//Get
licenseCategoryRoutes.get('/licenseCategory',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    findAllLicenseCategoryController.findAll
);

licenseCategoryRoutes.get('/licenseCategory/:id',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    validateLicenseCategoryParamsIdMiddleware.validate,
    findByIdLicenseCategoryController.findById
);

export { licenseCategoryRoutes };