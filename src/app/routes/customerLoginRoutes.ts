import { Router, Request, Response } from 'express';
import { customerLoginController } from '../controllers/login_controllers/CustomerLoginController';
import { customerLoginVerificationMiddleware } from '../middlewares/login_middlewares/CustomerLoginVerificationMiddleware';
import path from 'path';

const customerLoginRoutes = Router();

//Get
customerLoginRoutes.get('/login/customer',
    (req: Request, res: Response) => {
        const caminho = path.resolve(__dirname, '..', 'views', 'loginCustomer.ejs');
        res.render(caminho);
    });

//Post
customerLoginRoutes.post('/login/customer',
    customerLoginVerificationMiddleware.execute,
    customerLoginController.login,
    (req: Request, res: Response) => {
        res.redirect('/rentals/reserve');
    }
);

export { customerLoginRoutes }