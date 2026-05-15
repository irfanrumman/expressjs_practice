import type { Request, Response } from "express";
import { pool } from "../db";
import { userServiece } from "./user/user.serviece";

const creatUser = async (req: Request, res: Response) => {
  try {
    const result = await userServiece.creatUserIntoDB(req.body);
    res.status(201).json({
      message: "Created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServiece.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: "All Data Are Here!!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message,
      error: error,
    });
  }
};

const getSingelUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userServiece.getSingelUserFromDB(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "The User Is Here!",
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

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userServiece.updateUserFromDB(req.body, id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }
    res.status(200).json({
      success: true,
      message: " User Updated",
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

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userServiece.deleteUserFromDB(id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "User Deleted",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  creatUser,
  getAllUser,
  getSingelUser,
  updateUser,
  deleteUser,
};
