import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;