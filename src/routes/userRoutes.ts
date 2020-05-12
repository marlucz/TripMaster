import express, { Router, RequestHandler } from 'express';
import { userController } from '../controllers/userController';
import { authController } from '../controllers/authController';
import { catchErrors } from '../util/errorHandlers';

class UserRouter {
  public path = '/user';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router
      .post(
        `${this.path}/register`,
        catchErrors(userController.userRegister),
        authController.userLogin
      )
      .post(`${this.path}/login`, authController.userLogin)
      .post(`${this.path}/logout`, authController.userLogout)
      .post(`${this.path}/forgot`, catchErrors(userController.postForgot))
      .post(
        `${this.path}/reset/:token`,
        catchErrors(userController.resetPassword)
      )
      .post(
        `${this.path}/update-account`,
        catchErrors(userController.updateAccount)
      )
      .post(
        `${this.path}/update-password'`,
        catchErrors(userController.updatePassword)
      )
      .get(this.path);
  };
}
const userRouter = new UserRouter();
export default userRouter.router;
