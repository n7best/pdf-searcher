import express from "express";
import User from "../../models/user.model";
import { authorize, ADMIN, LOGGED_USER } from "../../middlewares/auth";
import { omit } from "lodash";

const router = express.Router();

// Load user when API with userId route parameter is hit
router.param("userId", async (req, res, next, id) => {
  const user = await User.get(id);
  req.locals = { user };
  return next();
});

router
  .route("/profile")
  .get(authorize(), async (req, res, next) => {
    res.json(req.user.transform());
  })
  .post(authorize(), async (req, res, next) => {
    const updatedUser = omit(req.body, "role");
    const user = Object.assign(req.user, updatedUser);

    user.save().then(savedUser => res.json(savedUser.transform()));
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
