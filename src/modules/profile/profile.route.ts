import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

router.post("/", profileController.creatProfile)

export const profileRouter = router;
