import { RequestHandler, Request, Response } from 'express';
import { body } from 'express-validator';

class TodoController {
  /**
   * GET api/trips/:tripSlug/todo
   *
   */
  public getTodo: RequestHandler = async (req, res) => {
    res.status(200).send({
      status: 200,
      message: 'request success'
    });
  };
}

export const todoController = new TodoController();
