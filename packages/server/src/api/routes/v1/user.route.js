import express from 'express';
import User from '../../models/user.model';

const router = express.Router();

// Load user when API with userId route parameter is hit
router.param('userId', async (req, res, next, id) => {
  const user = await User.get(id);
  req.locals = { user };
  return next();
});

export default router;