import { Router } from "express";
import { login } from "../controllers/main_controller.js";

const router = Router()

router.post('/login', login);

export default router