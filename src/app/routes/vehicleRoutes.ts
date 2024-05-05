import { Router, Request, Response } from "express";
import { createVehicleController } from "../controllers/vehicle_controllers/CreateVehicleController";
import { findAllVehicleController } from "../controllers/vehicle_controllers/FindAllVehicleController";
import { findByPlateVehicleController } from "../controllers/vehicle_controllers/FindByPlateVehicleController";
import { employeeAuthCookieMiddleware } from "../middlewares/employee_middlewares/EmployeeAuthCookieMiddleware";
import { authorizationByManagerMiddleware } from "../middlewares/employee_middlewares/AuthorizationForManagerMiddleware";
import { authorizationByAttendantMiddleware } from "../middlewares/employee_middlewares/AuthorizationForAttendantMiddleware";
import { validPlateFormatMiddleware } from "../middlewares/vehicle_middlewares/ValidatePlateFormatMiddleware";
import { existingVehicleCategoryMiddleware } from "../middlewares/vehicle_category_middlewares/ExistingVehicleCategoryMiddleware";
import { existingVehicleMiddleware } from "../middlewares/vehicle_middlewares/ExistingVehicleMiddleware";
import { validateVehicleParamsPlateMiddleware } from "../middlewares/vehicle_middlewares/ValidateVehicleParamsPlateMiddleware";
import path from "path"

const vehicleRoutes = Router();

// Post
vehicleRoutes.get('/vehicle', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'vehicle.ejs');
    res.render(caminho);
});

vehicleRoutes.post('/vehicles',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    validPlateFormatMiddleware.validate,
    existingVehicleMiddleware.check,
    existingVehicleCategoryMiddleware.check,
    createVehicleController.create
);

// Get
vehicleRoutes.get('/vehicles/all',
    employeeAuthCookieMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    findAllVehicleController.findAll
);

vehicleRoutes.get('/vehicles/:plate',
    employeeAuthCookieMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    validateVehicleParamsPlateMiddleware.validate,
    findByPlateVehicleController.findByPlate
);

export { vehicleRoutes };