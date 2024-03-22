import { Router, Request, Response } from 'express';
import { createEmployeeController } from '../controllers/employee_controllers/CreateEmployeeController';
import { findAllEmployeeController } from '../controllers/employee_controllers/FindAllEmployeeController';
import { findByIdEmployeeController } from '../controllers/employee_controllers/FindByIdEmployeeController';
import { validateEmployeeCpfMiddleware } from '../middlewares/employee_middlewares/ValidateEmployeeCpfMiddleware';
import { validateEmployeeEmailMiddleware } from '../middlewares/employee_middlewares/ValidateEmployeeEmailMiddleware';
import { validateEmployeePositionMiddleware } from '../middlewares/employee_middlewares/ValidateEmployeePositionMiddleware';
import { validateLicenseCategoryMiddleware } from '../middlewares/license_category_middlewares/ValidateLicenseCategoryMiddleware';
import { employeeAuthCookieMiddleware } from '../middlewares/employee_middlewares/EmployeeAuthCookieMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee_middlewares/AuthorizationForManagerMiddleware';
import { authorizationByAttendantMiddleware } from '../middlewares/employee_middlewares/AuthorizationForAttendantMiddleware';
import { validateEmployeeParamsIdMiddleware } from '../middlewares/employee_middlewares/ValidateEmployeeParamsIdMiddleware';
import path from 'path';
import { createTemplate } from '../helpers/createTemplate';
import handlebars from 'handlebars';

const employeeRoutes = Router();

// Post
employeeRoutes.get('/employee', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'employee.ejs');
    res.render(caminho);
});

employeeRoutes.post('/employees',
    employeeAuthCookieMiddleware.auth,
    // authorizationByManagerMiddleware.authorization,
    validateEmployeeCpfMiddleware.validate,
    validateEmployeeEmailMiddleware.validate,
    validateLicenseCategoryMiddleware.validate,
    validateEmployeePositionMiddleware.validate,
    createEmployeeController.create
);

employeeRoutes.get('/employees/all',
    employeeAuthCookieMiddleware.auth,
    // authorizationByManagerMiddleware.authorization,
    findAllEmployeeController.findAll
);

employeeRoutes.get('/employees/:id',
    employeeAuthCookieMiddleware.auth,
    validateEmployeeParamsIdMiddleware.validate,
    // authorizationByAttendantMiddleware.authorization,
    findByIdEmployeeController.findById
);

export { employeeRoutes };