import express from 'express';
import * as userController from '../controllers/userController';
import validate from '../handlers/validation';
import { SaveUser } from '../middlewares/validationMiddlewares';
import { isLoggedIn } from '../middlewares/authMiddlewares';

const router = express.Router();

router.post('/register', validate(SaveUser), userController.register);
router.post('/login', userController.login);
router.get('/me', isLoggedIn, userController.me);
router.get('/me/profile', isLoggedIn, userController.getProfile);

export default router;
