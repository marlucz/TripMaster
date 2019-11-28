import {Router, RequestHandler } from 'express';
import {UserController} from '../controllers/userController';


export class UserRoutes {
    public userController: UserController = new UserController()
    public routes(app: any): void {

        app.route('/signup')
            .get(this.userController.getSignup)
            .post(this.userController.postSignup)
    }
}



