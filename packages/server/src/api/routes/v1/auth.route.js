import express from "express";
import httpStatus from "http-status";
import User from "../../models/user.model";

const router = express.Router();

router.route("/login").post(async (req, res, next) => {
  try {
    const { user, accessToken } = await User.findAndGenerateToken(req.body);
    const userTransformed = user.transform();
    return res.json({ accessToken, user: userTransformed });
  } catch (error) {
    return next(error);
  }
});

export default router;
