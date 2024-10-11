import { Router, Request, Response } from 'express';
import { employeeForgotPasswordController } from '../controllers/password_controllers/EmployeeForgotPasswordController';
import { employeeChangePasswordController } from '../controllers/password_controllers/EmployeeChangePasswordController';
import { employeeForgottenPasswordRequestMiddleware } from '../middlewares/password_employee_middleware/EmployeeForgottenPasswordRequestMiddleware';
import { passwordAuthMiddleware } from '../middlewares/password_customer_middlewares/PasswordAuthMiddleware';
import { employeePasswordTokenVerificationMiddleware } from '../middlewares/password_employee_middleware/EmployeePasswordTokenVerificationMiddleware';
import { compareEmployeePasswordsMiddleware } from '../middlewares/password_employee_middleware/CompareEmployeePasswordsMiddleware';
import { validateCustomerParamsIdMiddleware } from '../middlewares/customer_middlewares/ValidateCustomerParamsIdMiddleware';
import path from 'path';


const passwordEmployeeRoutes = Router();

//Get
passwordEmployeeRoutes.get('/password/employee/forgot', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'passwordForgotEmployee.ejs');
    res.render(caminho);
});

//Post
passwordEmployeeRoutes.post('/password/employee/forgot',
    employeeForgottenPasswordRequestMiddleware.check,
    employeeForgotPasswordController.forgotEmployeePassword
);

//Put
passwordEmployeeRoutes.put('/password/employee/change/:id',
    passwordAuthMiddleware.execute,
    validateCustomerParamsIdMiddleware.validate,
    employeePasswordTokenVerificationMiddleware.execute,
    compareEmployeePasswordsMiddleware.compare,
    employeeChangePasswordController.changeEmployeePassword
);

export { passwordEmployeeRoutes };