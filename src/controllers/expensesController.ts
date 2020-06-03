import { RequestHandler, Request, Response } from 'express';
import { body } from 'express-validator';
import { Expense } from '../models/expenseModel';
import { Trip } from '../models/tripModel';

class ExpensesController {
  /**
   * POST api/trips/:tripSlug/expenses
   *
   */
  public addExpense: RequestHandler = async (req, res) => {
    const tripBySlug = await Trip.findOne({
      slug: req.params.slug,
      userID: req.body.userID
    });

    if (tripBySlug) {
      const newExpense = {
        name: req.body.name,
        value: req.body.value,
        currency: req.body.currency,
        tags: req.body.tags,
        userID: req.body.userID,
        tripID: tripBySlug._id
      };

      try {
        await new Expense(newExpense).save((err, expense) => {
          return res.status(200).send(expense);
        });
      } catch (err) {
        res.sendStatus(500);
      }
    }
  };

  /**
   * GET api/trips/:slug/expenses
   *
   */
  public getExpenses: RequestHandler = async (req, res) => {
    const tripBySlug = await Trip.findOne({
      slug: req.params.slug,
      userID: req.query.userID
    });

    if (tripBySlug) {
      await Expense.find({ userID: req.query.userID, tripID: tripBySlug._id })
        .then(results => {
          res.status(200).send(results);
        })
        .catch(err => res.sendStatus(500));
    } else {
      return res.status(404);
    }
  };

  /**
   * DELETE api/trips/:slug/expenses/:id
   *
   */

  public deleteExpense: RequestHandler = async (req, res) => {
    Expense.findByIdAndDelete(req.params.id)
      .then(result => {
        if (!result) {
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
      })
      .catch(err => res.sendStatus(500));
  };
}

export const expensesController = new ExpensesController();
