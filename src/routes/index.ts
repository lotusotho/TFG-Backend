import express from 'express';
import { pingController } from '../controllers/ping-controller';
import { loginController } from '../controllers/login-controller';
import { apikeyChecker, tokenChecker } from '../middlewares/auth-middleware';
import { registerController } from '../controllers/register-controller';
import { registrationMiddleware } from '../middlewares/register-middleware';
import { tokenUsernameController } from '../controllers/token-controller';
import {
  getContentController,
  getContentControllerDomain,
  postContentController,
} from '../controllers/content-controller';
import { subdomainMiddleware } from '../middlewares/subdomain-middleware';
import { logoutController } from '../controllers/logout-controller';

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registrationMiddleware, registerController);
router.post('/submitcontent', tokenChecker, postContentController);

router.get('/secure', tokenChecker, pingController);
router.get('/apikey', apikeyChecker, pingController);
router.get('/tokenusername', tokenChecker, tokenUsernameController);
router.get('/usercontent', getContentController);
router.get('/logout', logoutController);
router.get('/userpage', subdomainMiddleware, getContentControllerDomain);

export default router;
