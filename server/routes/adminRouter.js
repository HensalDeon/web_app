import { Router } from "express";
const router = Router();


/** import all controllers */
import * as controller from '../controllers/adminController.js'

/** GET methods */
router.route('/userlist').get(controller.getUserList);

export default router;