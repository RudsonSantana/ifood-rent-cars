import { Router, Request, Response } from 'express';
import { employeeLoginController } from '../controllers/login_controllers/EmployeeLoginController';
import { employeeLoginVerificationMiddleware } from '../middlewares/login_middlewares/EmployeeLoginVerificationMiddleware';
import path from 'path';

const employeeLoginRoutes = Router();

//Get 
employeeLoginRoutes.get('/login/employee',
    (req: Request, res: Response) => {
        const caminho = path.resolve(__dirname, '..', 'views', 'loginEmployee.ejs');
        res.render(caminho);
    });

//Post
employeeLoginRoutes.post('/login/employee',
    employeeLoginVerificationMiddleware.execute,
    employeeLoginController.login,
    (req: Request, res: Response) => {
        res.redirect('/dashboard/employee');
    }
);

export { employeeLoginRoutes };