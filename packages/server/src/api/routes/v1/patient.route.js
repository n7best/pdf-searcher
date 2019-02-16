import express from "express";
import User from "../../models/user.model";
import { authorize, DOCTOR } from "../../middlewares/auth";

const router = express.Router();

router.route("/").get(authorize(DOCTOR), async (req, res, next) => {
  const { name } = req.query;
  try {
    const users = await User.list({
      role: "patient",
      name
    });
    const transformedUsers = users.map(user => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
});

export default router;
