import express from "express";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";
import patientRoutes from "./patient.route";

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/ping", (req, res) => res.send("Pong"));

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/patients", patientRoutes);

export default router;
