import { Router, Request, Response } from 'express';
import { forgotEmployeePasswordController } from '../controllers/password_controllers/ForgotEmployeePasswordController';
import { changeEmployeePasswordController } from '../controllers/password_controllers/ChangeEmployeePasswordController';
import { employeeForgottenPasswordRequestMiddleware } from '../middlewares/employee_middlewares/EmployeeForgottenPasswordRequestMiddleware';
import { passwordAuthMiddleware } from '../middlewares/password_middlewares/PasswordAuthMiddleware';
import { employeePasswordTokenVerificationMiddleware } from '../middlewares/employee_middlewares/EmployeePasswordTokenVerificationMiddleware';
import { compareEmployeePasswordsMiddleware } from '../middlewares/employee_middlewares/CompareEmployeePasswordsMiddleware';
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
    // employeeForgottenPasswordRequestMiddleware.check, (req: Request, res: Response) => {
    //     forgotEmployeePasswordController.forgotEmployeePassword
    //     res.redirect('/password/employee/change/:id');
    // }
    forgotEmployeePasswordController.forgotEmployeePassword, (req: Request, res: Response) => {
        res.redirect('/password/employee/change/6bec398c-995d-48db-9b5a-59556e81045c')
    }
);

//Put
passwordEmployeeRoutes.put('/password/employee/change/:id',
    passwordAuthMiddleware.execute,
    validateCustomerParamsIdMiddleware.validate,
    employeePasswordTokenVerificationMiddleware.execute,
    compareEmployeePasswordsMiddleware.compare,
    changeEmployeePasswordController.changeEmployeePassword
);

export { passwordEmployeeRoutes };