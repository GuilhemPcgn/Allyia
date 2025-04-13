import express from 'express';
import { signup, login } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);

export default authRouter;








// import express from 'express';
// import * as authController from '../controllers/authController.js';
// import { limiter } from '../middleware/security.js';

// const router = express.Router();

// router.use(limiter);

// router.post('/register', authController.register);
// router.post('/login', authController.login);
// router.post('/refresh-token', authController.refreshToken);

// export default router;