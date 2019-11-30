import express, {Router, RequestHandler } from 'express';
import {userController} from '../controllers/userController';

class UserRouter {
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes():void {
        this.router.route('/signup')
            .get(userController.getSignup)
            .post(userController.postSignup)
        this.router.route('/login')
            .get(userController.getLogin)
        this.router.route('/forgot')
            .get(userController.forgot)
    }
}
const userRouter = new UserRouter();
export default userRouter.router;