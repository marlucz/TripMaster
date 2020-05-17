import express from 'express';
import { expensesController } from '../controllers/expensesController';

class ExpensesRouter {
  public path = '/';
  public router = express.Router({ mergeParams: true });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get(this.path, expensesController.getExpenses);
  };
}

const expensesRouter = new ExpensesRouter();
export default expensesRouter.router;
