import { Router, Request, Response } from 'express';
import { singInEmployeeController } from '../controllers/login_controllers/SingInEmployeeController';
import { employeeLoginVerificationMiddleware } from '../middlewares/employee_middlewares/EmployeeLoginVerificationMiddleware';
import path from 'path';

const loginEmployeeRoutes = Router();

//Get 
loginEmployeeRoutes.get('/login/employee',
    (req: Request, res: Response) => {
        const caminho = path.resolve(__dirname, '..', 'views', 'loginEmployee.ejs');
        res.render(caminho);
    });

//Post
loginEmployeeRoutes.post('/login/employee',
    employeeLoginVerificationMiddleware.execute,
    singInEmployeeController.signInEmployee,
    (req: Request, res: Response) => {
        res.redirect('/dashboard/employee');
    }
);

export { loginEmployeeRoutes };