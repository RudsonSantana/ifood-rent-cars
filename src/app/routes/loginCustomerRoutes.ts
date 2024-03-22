import { Router, Request, Response } from 'express';
import { singInCustomerController } from '../controllers/login_controllers/SingInCustomerController';
import { customerLoginVerificationMiddleware } from '../middlewares/customer_middlewares/CustomerLoginVerificationMiddleware';
import path from 'path';

const loginCustomerRoutes = Router();

//Get
loginCustomerRoutes.get('/login/customer', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'loginCustomer.ejs');
    res.render(caminho);
});

//Post
loginCustomerRoutes.post('/login/customer',
    customerLoginVerificationMiddleware.execute,
    singInCustomerController.signInCustomer,
    (req: Request, res: Response) => {
        res.redirect('/rentals/reserve');
    }
);

export { loginCustomerRoutes }