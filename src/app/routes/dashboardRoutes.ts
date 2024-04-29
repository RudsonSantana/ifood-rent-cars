import { Router, Request, Response } from 'express';
import path from 'path';

const dashboardRoutes = Router();

// Get
dashboardRoutes.get('/dashboard/employee',
    (req: Request, res: Response) => {
        const caminho = path.resolve(__dirname, '..', 'views', 'dashboardEmployee.ejs');
        res.render(caminho);
    });

export { dashboardRoutes }