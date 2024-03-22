import { Router, Request, Response } from 'express';
import { forgotCustomerPasswordController } from '../controllers/password_controllers/ForgotCustomerPasswordController';
import { changeCustomerPasswordController } from '../controllers/password_controllers/ChangeCustomerPasswordController';
import { customerForgottenPasswordRequestMiddleware } from '../middlewares/customer_middlewares/CustomerForgottenPasswordRequestMiddleware';
import { passwordAuthMiddleware } from '../middlewares/password_middlewares/PasswordAuthMiddleware';
import { customerTokenVerificationMiddleware } from '../middlewares/customer_middlewares/CustomerTokenVerificationMiddleware';
import { compareCustomerPasswordsMiddleware } from '../middlewares/customer_middlewares/CompareCustomerPasswordsMiddleware';
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
    customerForgottenPasswordRequestMiddleware.check, (req: Request, res: Response) => {
        forgotCustomerPasswordController.forgotCustomerPassword
        res.redirect('/password/customer/change/:id');
    }
);

//Put
passwordCustomerRoutes.put('/password/customer/change/:id',
    passwordAuthMiddleware.execute,
    validateCustomerParamsIdMiddleware.validate,
    customerTokenVerificationMiddleware.execute,
    compareCustomerPasswordsMiddleware.compare,
    changeCustomerPasswordController.changeCustomerPassword
);

export { passwordCustomerRoutes }