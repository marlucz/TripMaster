import express from 'express';
import { todoController } from '../controllers/todoController';

class TodoRouter {
  public path = '/';
  public router = express.Router({ mergeParams: true });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get(this.path, todoController.getTodo);
  };
}

const todoRouter = new TodoRouter();
export default todoRouter.router;
