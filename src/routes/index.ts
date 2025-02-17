import express from 'express';
import { pingController } from '../controllers/ping-controller';
import { loginController } from '../controllers/login-controller';
import { tokenChecker } from '../middlewares/auth-middleware';
import { registerController } from '../controllers/register-controller';
import { registrationMiddleware } from '../middlewares/register-middleware';
import { tokenUsernameController } from '../controllers/token-controller';
import {
  getAllPostsController,
  postContentController,
} from '../controllers/content-controller';
import { logoutController } from '../controllers/logout-controller';
import { UsernameController } from '../controllers/user-controller.js';
import { getIndexController } from '../controllers/index.js';
import {
  resetPassword,
  sendPasswordResetEmail,
} from '../controllers/password-reset-email.js';
import {
  isUserVerifiedByTokenController,
  sendVerificationEmail,
  verifyEmail,
} from '../controllers/email-verify-controller.js';
import { verifyUserMiddleware } from '../middlewares/verify-middleware.js';

const router = express.Router();

router.get('/', getIndexController);
// router.get('/secure', tokenChecker, pingController);
router.get(
  '/tokenusername',
  verifyUserMiddleware,
  tokenChecker,
  tokenUsernameController
);
router.get('/username', UsernameController);
router.get(
  '/usercontent',
  verifyUserMiddleware,
  tokenChecker,
  getAllPostsController
);
router.get('/logout', logoutController);
router.get('/verify-email', verifyEmail);
router.get('/posts', getAllPostsController);
router.get('/isverified', tokenChecker, isUserVerifiedByTokenController);

router.post('/login', loginController);
router.post('/register', registrationMiddleware, registerController);
router.post(
  '/submitcontent',
  verifyUserMiddleware,
  tokenChecker,
  postContentController
);
router.post('/send-verification-email', sendVerificationEmail);
router.post('/send-password-reset-email', sendPasswordResetEmail);
router.post('/reset-password', resetPassword);

export default router;
