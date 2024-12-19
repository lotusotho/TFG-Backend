import express from 'express';
import { pingController } from '../controllers/ping-controller';
import { loginController } from '../controllers/login-controller';
import { apikeyChecker, tokenChecker } from '../middlewares/auth-middleware';
import { registerController } from '../controllers/register-controller';
import { registrationValidation } from '../middlewares/register-middleware';

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registrationValidation, registerController);
router.get('/secure', tokenChecker, pingController);
router.get('/apikey', apikeyChecker, pingController);

export default router;
