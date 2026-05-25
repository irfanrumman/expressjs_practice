import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/user/user.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middellware/logger";
import cookieparser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middellware/globalErrorHandler";

const app: Application = express();

app.use(cookieparser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(cors({ origin: "http://localhost:5000" }));
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express JS",
    author: "Hablu",
  });
});

app.use("/api/users", userRoute);
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRoute);

export default app;
