import type { Request, Response } from "express";
import { profileSreviece } from "./profile.serviece";

const creatProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileSreviece.creatProfileIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Profile Successfully Created!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const profileController = {
  creatProfile,
};
