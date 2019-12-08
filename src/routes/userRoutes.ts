import express, { Router, RequestHandler } from 'express';
import { userController } from '../controllers/userController';
import { authController } from '../controllers/authController';
import { catchErrors, validate } from '../util/errorHandlers';

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
      .route('/update-account')
      .post(catchErrors(userController.updateAccount));
    this.router
      .route('/update-password')
      .post(catchErrors(userController.updatePassword));
    this.router
      .route('/trips')
      .get(authController.isAuthenticated, userController.getTrips);
    this.router
      .route('/add-trip')
      .get(authController.isAuthenticated, userController.getAddTrip);
    // TODO route to be deleted after mail sending is done
    this.router.route('/mail').get((req, res) => {
      res.status(200).render('email/mailLayout');
    });
    this.router.route('/404').get(authController.show404);
  }
}
const userRouter = new UserRouter();
export default userRouter.router;
