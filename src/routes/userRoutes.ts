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
    this.router.route('/update-account').post(userController.updateAccount);
    this.router.route('/update-password').post(userController.updatePassword);
    this.router
      .route('/trips')
      .get(authController.isAuthenticated, userController.getTrips);
    this.router
      .route('/add-trip')
      .get(authController.isAuthenticated, userController.getAddTrip);
    this.router.route('/404').get(authController.show404);
  }
}
const userRouter = new UserRouter();
export default userRouter.router;
