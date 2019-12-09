import express, { Router, RequestHandler } from 'express';
import { userController } from '../controllers/userController';
import { authController } from '../controllers/authController';
import { catchErrors } from '../util/errorHandlers';

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router
      .route('/')
      .get(authController.isAuthenticated, userController.mainPage);
    this.router
      .route('/signup')
      .get(userController.getSignup)
      .post(catchErrors(userController.postSignup), authController.login);
    this.router
      .route('/login')
      .get(userController.getLogin)
      .post(authController.login);
    this.router
      .route('/forgot')
      .get(userController.forgot)
      .post(catchErrors(userController.postForgot));
    this.router
      .route('/account')
      .get(authController.isAuthenticated, userController.getAccount);
    this.router
      .route('/account/reset/:token')
      .get(catchErrors(userController.getReset))
      .post(catchErrors(userController.resetPassword));
    this.router
      .route('/update-account')
      .post(catchErrors(userController.updateAccount));
    this.router
      .route('/update-password')
      .post(catchErrors(userController.updatePassword));
    this.router.route('/404').get(authController.show404);
  }
}
const userRouter = new UserRouter();
export default userRouter.router;
