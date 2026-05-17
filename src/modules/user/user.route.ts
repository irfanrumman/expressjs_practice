import { Router, type Request, type Response } from "express";
import { userController } from "../user.controller";
import auth from "../../middellware/auth";

const router = Router();

router.post("/", userController.creatUser);
router.get("/", auth(), userController.getAllUser);
router.get("/:id", userController.getSingelUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRoute = router;
