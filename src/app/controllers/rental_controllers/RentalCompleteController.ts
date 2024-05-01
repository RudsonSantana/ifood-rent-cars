import { Request, Response, NextFunction } from 'express';
import { parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { rentalCompleteService } from '../../services/rental_services/RentalCompleteService';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

class RentalCompleteController {
    async complete(req: Request, res: Response, next: NextFunction) {
        try {
          const { id, endDate, startDate } = req.body;
          const formattedStartDate = parse(startDate, "dd-MM-yyyy HH:mm", new Date());
          const formattedEndDate = parse(endDate, 'dd-MM-yyyy HH:mm', new Date(), { locale: ptBR });
          rentalCompleteService.complete(id, formattedEndDate, formattedStartDate);
          res.status(StatusCodes.OK).send({ message: 'Devolução do veículo concluída com sucesso' });
          next();
        } catch (error) {
          console.log(AppError)
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro interno do servidor' });
          next(error);
        }
      }
}

const rentalCompleteController = new RentalCompleteController();

export { rentalCompleteController }