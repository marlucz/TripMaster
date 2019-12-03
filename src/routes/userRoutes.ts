import express, { Router, RequestHandler } from 'express';
import { userController } from '../controllers/userController';
import { authController } from '../controllers/authController';

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes(): void {
    this.router
      .route('/')
      .get(authController.isAuthenticated, userController.mainPage);
    this.router
      .route('/signup')
      .get(userController.getSignup)
      .post(userController.postSignup, authController.login);
    this.router
      .route('/login')
      .get(userController.getLogin)
      .post(authController.login);
    this.router.route('/forgot').get(userController.forgot);
    this.router
      .route('/account')
      .get(authController.isAuthenticated, userController.getAccount);
  }
}
const userRouter = new UserRouter();
export default userRouter.router;
