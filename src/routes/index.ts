import express from 'express';
import { pingController } from '../controllers/ping-controller.js';
import { loginController } from '../controllers/login-controller.js';
import { apikeyChecker, tokenChecker } from '../middlewares/auth-middleware.js';
import { registerController } from '../controllers/register-controller.js';
import { registrationMiddleware } from '../middlewares/register-middleware.js';
import { tokenUsernameController } from '../controllers/token-controller.js';
import {
  getContentController,
  postContentController,
} from '../controllers/content-controller.js';
import { subdomainMiddleware } from '../middlewares/subdomain-middleware.js';
import { userPageController } from '../controllers/userpage-controller.js';
import { logoutController } from '../controllers/logout-controller.js';

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registrationMiddleware, registerController);
router.post('/submitcontent', tokenChecker, postContentController);

router.get('/', subdomainMiddleware, userPageController); // TODO: Seguir con lo del subdominio
router.get('/secure', tokenChecker, pingController);
router.get('/apikey', apikeyChecker, pingController);
router.get('/tokenusername', tokenChecker, tokenUsernameController);
router.get('/usercontent', tokenChecker, getContentController);
router.get('/logout', logoutController);

export default router;
