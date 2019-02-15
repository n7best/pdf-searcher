import express from "express";
import User from "../../models/user.model";
import { authorize, ADMIN, LOGGED_USER } from "../../middlewares/auth";

const router = express.Router();

// Load user when API with userId route parameter is hit
router.param("userId", async (req, res, next, id) => {
  const user = await User.get(id);
  req.locals = { user };
  return next();
});

router.route("/").get(authorize(LOGGED_USER), async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    const transformedUsers = users.map(user => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
});

export default router;
