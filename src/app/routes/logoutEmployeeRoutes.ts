import { Router, Request, Response } from 'express';
import path from 'path';

const logoutEmployeeRoutes = Router();

logoutEmployeeRoutes.get('/logout/employee', (req: Request, res: Response) => {
    res.clearCookie('token');
    const caminho = path.resolve(__dirname, '..', 'views', 'loginEmployee.ejs');
    res.render(caminho);
});

export { logoutEmployeeRoutes }