import { Router, Request, Response } from "express";
import { rentalReserveController } from "../controllers/rental_controllers/RentalReserveController";
import { rentalStartController } from "../controllers/rental_controllers/RentalStartController";
import { rentalCompleteController } from "../controllers/rental_controllers/RentalCompleteController";
import { employeeAuthCookieMiddleware } from "../middlewares/employee_middlewares/EmployeeAuthCookieMiddleware";
import { existingRentalMiddleware } from "../middlewares/rental_middlewares/ExistingRentalMiddleware";
import { authorizationByAttendantMiddleware } from "../middlewares/employee_middlewares/AuthorizationForAttendantMiddleware";
import { customerAuthCookieMiddleware } from "../middlewares/customer_middlewares/CustomerAuthCookieMiddleware";
import path from 'path';

const rentalRoutes = Router();

// Get
rentalRoutes.get('/rentals/reserve', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'rentalsReserve.ejs');
    res.render(caminho);
});

rentalRoutes.get('/rentals/start', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'rentalsStart.ejs');
    res.render(caminho);
});

// Post
rentalRoutes.post('/rentals/reserve', customerAuthCookieMiddleware.auth, (req: Request, res: Response) => {
    rentalReserveController.reserve
});

rentalRoutes.post('/rentals/start', employeeAuthCookieMiddleware.auth, (req: Request, res: Response) => {
    existingRentalMiddleware.check,
    rentalStartController.start
});

rentalRoutes.post('/rentals/complete',
    employeeAuthCookieMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    existingRentalMiddleware.check,
    rentalCompleteController.complete
);

export { rentalRoutes };