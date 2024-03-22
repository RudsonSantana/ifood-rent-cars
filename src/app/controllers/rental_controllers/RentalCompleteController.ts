import { Request, Response, NextFunction } from 'express';
import { parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { rentalCompleteService } from '../../services/rental_services/RentalCompleteService';

class RentalCompleteController {
    async complete(req: Request, res: Response, next: NextFunction) {
        try {
          const { id, endDate, startDate } = req.body;
          const formattedStartDate = parse(startDate, "dd-MM-yyyy HH:mm", new Date());
          const formattedEndDate = parse(endDate, 'dd-MM-yyyy HH:mm', new Date(), { locale: ptBR });
    
          console.log("Data inicial formatada no controller",formattedStartDate)
          console.log("Data final formatada no controller",formattedEndDate)
    
          rentalCompleteService.complete(id, formattedEndDate, formattedStartDate);
          res.status(200).send({ message: 'Devolução do veículo concluída com sucesso' });
          next();
        } catch (error) {
          res.status(400).send({ error: error.message });
          next(error);
        }
      }
}

const rentalCompleteController = new RentalCompleteController();

export { rentalCompleteController }