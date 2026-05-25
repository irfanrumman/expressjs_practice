import bcrypt from "bcryptjs";
import { pool } from "../../db";
import Jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../configaration";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  const userData = await pool.query(
    `
      SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Wrong Email!");
  }
  const user = userData.rows[0];
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Wrong Password!");
  }

  // Generate jwttoken

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
  };

  const accessToken = Jwt.sign(jwtPayload, config.secrete as string, {
    expiresIn: "1d",
  });

  const refreshToken = Jwt.sign(jwtPayload, config.refresh_secrete as string, {
    expiresIn: "10d",
  });

  return { accessToken, refreshToken };
};

const generateRfreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized!");
  }

  //Decoded
  const decoded = Jwt.verify(
    token as string,
    config.refresh_secrete as string,
  ) as JwtPayload;

  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
      `,
    [decoded.email],
  );

  const user = userData.rows[0];

  if (userData.rows.length === 0) {
    throw new Error("User not found!");
  }

  if (!user.is_active) {
    throw new Error("Forbidden!!");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
  };

  const accessToken = Jwt.sign(jwtPayload, config.secrete as string, {
    expiresIn: "1d",
  });
  return { accessToken };
};

export const authserviece = {
  loginUserIntoDB,
  generateRfreshToken,
};
