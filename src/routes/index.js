import express from 'express';
import { middlewareController, errorController } from '../controllers/index.js';
import { logMDW } from '../middlewares/logger-middleware.js';
import { pingController } from '../controllers/ping-controller.js';
import { loginController } from '../controllers/login-controller.js';
import { apikeyChecker, tokenChecker } from '../middlewares/auth-middleware.js';

const router = express.Router();

// router.get('/middleware', logMDW, middlewareController);
// router.get('/error', errorController);

router.get('/ping', pingController);
router.post('/login', loginController);
router.get('/secure', tokenChecker, pingController);
router.get('/apikey', apikeyChecker, pingController);

export default router;
