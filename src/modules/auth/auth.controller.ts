import type { Request, Response } from "express";
import { authserviece } from "./auth.serviece";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authserviece.loginUserIntoDB(req.body);
    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false, //in production true needed
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "User Login Successfully!",
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

const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authserviece.generateRfreshToken(
      req.cookies.refreshToken,
    );

    res.status(200).json({
      success: true,
      message: "Access Token Generated!!",
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
  refreshToken,
};
