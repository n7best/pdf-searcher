import express from 'express';
import userRoutes from './user.route';

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/ping', (req, res) => res.send('Pong'));

router.use('/users', userRoutes);

export default router;
