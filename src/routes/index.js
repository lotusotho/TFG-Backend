import express from 'express';
import { pingController } from '../controllers/ping-controller.js';
import { loginController } from '../controllers/login-controller.js';
import { apikeyChecker, tokenChecker } from '../middlewares/auth-middleware.js';
import { registerController } from '../controllers/register-controller.js';
import { registrationValidation } from '../middlewares/register-middleware.js';

const router = express.Router();

router.get('/ping', pingController);
router.post('/login', loginController);
router.post('/register', registrationValidation, registerController);
router.get('/secure', tokenChecker, pingController);
router.get('/apikey', apikeyChecker, pingController);

export default router;
