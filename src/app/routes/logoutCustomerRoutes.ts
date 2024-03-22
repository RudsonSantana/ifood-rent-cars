import { Router, Request, Response } from 'express';
import path from 'path';

const logoutCustomerRoutes = Router();

//Get
logoutCustomerRoutes.get('/logout/customer', (req: Request, res: Response) => {
    res.clearCookie('token');
    res.redirect('/login/customer')
});

export { logoutCustomerRoutes }