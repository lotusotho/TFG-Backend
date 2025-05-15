import express from 'express';
import { loginController } from '../controllers/login-controller';
import { tokenChecker } from '../middlewares/auth-middleware';
import { registerController } from '../controllers/register-controller';
import { registrationMiddleware } from '../middlewares/register-middleware';
import {
  deletePostController,
  getAllPostsController,
  postContentController,
} from '../controllers/content-controller';
import { logoutController } from '../controllers/logout-controller';
import {
  deleteUserController,
  UsernameController,
} from '../controllers/user-controller.js';
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

router.delete(
  '/post/:id',
  verifyUserMiddleware,
  tokenChecker,
  deletePostController
);
router.delete(
  '/user',
  verifyUserMiddleware,
  tokenChecker,
  deleteUserController
);

export default router;
