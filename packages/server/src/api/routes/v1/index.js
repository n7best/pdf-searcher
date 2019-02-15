import express from "express";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/ping", (req, res) => res.send("Pong"));

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
