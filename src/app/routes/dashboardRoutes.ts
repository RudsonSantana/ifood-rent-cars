import { Router, Request, Response } from 'express';
import path from 'path';
import { employeeAuthCookieMiddleware } from '../middlewares/employee_middlewares/EmployeeAuthCookieMiddleware';

const dashboardRoutes = Router();

// Get
dashboardRoutes.get('/dashboard/employee', (req: Request, res: Response) => {
    // employeeAuthCookieMiddleware.auth;
    const caminho = path.resolve(__dirname, '..', 'views', 'dashboardEmployee.ejs');
    res.render(caminho);
});

export { dashboardRoutes }