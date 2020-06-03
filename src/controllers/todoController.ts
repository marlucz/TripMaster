import { RequestHandler, Request, Response } from 'express';
import { body } from 'express-validator';
import { Todo } from '../models/todoModel';
import { Trip } from '../models/tripModel';

class TodoController {
  /**
   * POST api/trips/:tripSlug/todo
   *
   */
  public addTodo: RequestHandler = async (req, res) => {
    const tripBySlug = await Trip.findOne({
      slug: req.params.slug,
      userID: req.body.userID
    });

    if (tripBySlug) {
      const newTodo = {
        name: req.body.name,
        userID: req.body.userID,
        tripID: tripBySlug._id
      };

      try {
        await new Todo(newTodo).save((err, todo) => {
          return res.status(200).send(todo);
        });
      } catch (err) {
        res.sendStatus(500);
      }
    }
  };

  /**
   * GET api/trips/:slug/todo
   *
   */
  public getTodo: RequestHandler = async (req, res) => {
    const tripBySlug = await Trip.findOne({
      slug: req.params.slug,
      userID: req.query.userID
    });

    if (tripBySlug) {
      await Todo.find({ userID: req.query.userID, tripID: tripBySlug._id })
        .then(results => {
          res.status(200).send(results);
        })
        .catch(err => res.sendStatus(500));
    } else {
      return res.status(404);
    }
  };

  /**
   * DELETE api/trips/:slug/todo/:id
   *
   */

  public deleteTodo: RequestHandler = async (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
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

export const todoController = new TodoController();
