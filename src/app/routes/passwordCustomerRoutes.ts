import { Router, Request, Response } from 'express';
import { customerForgotPasswordController } from '../controllers/password_controllers/CustomerForgotPasswordController';
import { customerChangePasswordController } from '../controllers/password_controllers/CustomerChangePasswordController';
import { customerForgottenPasswordRequestMiddleware } from '../middlewares/password_customer_middlewares/CustomerForgottenPasswordRequestMiddleware';
import { passwordAuthMiddleware } from '../middlewares/password_customer_middlewares/PasswordAuthMiddleware';
import { customerPasswordTokenVerificationMiddleware } from '../middlewares/password_customer_middlewares/CustomerPasswordTokenVerificationMiddleware';
import { compareCustomerPasswordsMiddleware } from '../middlewares/password_customer_middlewares/CompareCustomerPasswordsMiddleware';
import { validateCustomerParamsIdMiddleware } from '../middlewares/customer_middlewares/ValidateCustomerParamsIdMiddleware';
import path from 'path';


const passwordCustomerRoutes = Router();

//Get
passwordCustomerRoutes.get('/password/customer/forgot', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'passwordForgotCustomer.ejs');
    res.render(caminho);
});

//Post
passwordCustomerRoutes.post('/password/customer/forgot',
    customerForgottenPasswordRequestMiddleware.check,
    customerForgotPasswordController.forgotCustomerPassword
);

//Put
passwordCustomerRoutes.put('/password/customer/change/:id',
    passwordAuthMiddleware.execute,
    validateCustomerParamsIdMiddleware.validate,
    customerPasswordTokenVerificationMiddleware.execute,
    compareCustomerPasswordsMiddleware.compare,
    customerChangePasswordController.changeCustomerPassword
);

export { passwordCustomerRoutes }