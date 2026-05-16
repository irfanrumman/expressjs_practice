import type { Request, Response } from "express";
import { authserviece } from "./auth.serviece";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authserviece.loginUserIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: "User Is Here!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authController = {
  loginUser,
};
