import { Router } from "express";
import authenticationRoute from "./AuthenticationRoute.js"; // Ensure the path is correct

const router = Router();


router.use("/auth", authenticationRoute);

export default router;
