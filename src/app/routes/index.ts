import { Router } from 'express';
import { vehicleRoutes } from './vehicleRoutes';
import { rentalRoutes } from './rentalRoutes';
import { customerRoutes } from './customerRoutes';
import { loginCustomerRoutes } from './loginCustomerRoutes';
import { loginEmployeeRoutes } from './loginEmployeeRoutes';
import { logoutCustomerRoutes } from './logoutCustomerRoutes';
import { logoutEmployeeRoutes } from './logoutEmployeeRoutes';
import { employeeRoutes } from './employeeRoutes';
import { passwordEmployeeRoutes } from './passwordEmployeeRoutes';
import { passwordCustomerRoutes } from './passwordCustomerRoutes';
import { licenseCategoryRoutes } from './licenseCategoryRoutes';
import { vehicleCategoryRoutes } from './vehicleCategoryRoutes';
import { employeePositionRoutes } from './employeePositionRoutes';
import { rentalStatusRoutes } from './rentalStatusRoutes';
import { dashboardRoutes } from './dashboardRoutes';

const routes = Router();

routes.use(
    loginEmployeeRoutes,
    loginCustomerRoutes,
    logoutEmployeeRoutes,
    logoutCustomerRoutes,
    passwordCustomerRoutes,
    passwordEmployeeRoutes,
    vehicleRoutes, 
    rentalRoutes, 
    customerRoutes,
    employeeRoutes,
    licenseCategoryRoutes,
    vehicleCategoryRoutes,
    employeePositionRoutes,
    rentalStatusRoutes,
    dashboardRoutes
);

export { routes };