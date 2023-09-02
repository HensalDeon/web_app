import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/userController.js'

/** POST methods */
router.route('/register').post(controller.register); //resiter user
router.route('/registerMail').post(); //send the email
router.route('/authenticate').post((req,res)=> res.end()); //authenticate user
router.route('/login').post(controller.login); //login in app



/** GET methods */
router.route('/user/:username').get(controller.getUser); //user with username
router.route('/generateOTP').get(controller.generateOTP); //generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP); // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); //reset all the variable


/** PUT methods */
router.route('/updateUser').put(controller.updateUser); //is use to update the user profile
router.route('/resetPassword').put(controller.resetPassword); //use to reset password

export default router;