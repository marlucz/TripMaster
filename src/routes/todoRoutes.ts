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
    this.router.post(this.path, todoController.addTodo);
    this.router.delete(`${this.path}:id`, todoController.deleteTodo);
  };
}

const todoRouter = new TodoRouter();
export default todoRouter.router;
