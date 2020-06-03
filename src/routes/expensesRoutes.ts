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
    this.router.post(this.path, expensesController.addExpense);
    this.router.delete(`${this.path}:id`, expensesController.deleteExpense);
  };
}

const expensesRouter = new ExpensesRouter();
export default expensesRouter.router;
