import { RequestHandler, Request, Response } from 'express';
import { body } from 'express-validator';

class ExpensesController {
  /**
   * GET api/trips/:tripSlug/expenses
   *
   */
  public getExpenses: RequestHandler = async (req, res) => {
    res.status(200).send({
      status: 200,
      message: 'request success'
    });
  };
}

export const expensesController = new ExpensesController();
