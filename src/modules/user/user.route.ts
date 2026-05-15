import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "../user.controller";

const router = Router();

router.post("/", userController.creatUser);
router.get("/", userController.getAllUser);
router.get("/:id", userController.getSingelUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRoute = router;
