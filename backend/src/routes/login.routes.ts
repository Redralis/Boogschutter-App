import express from "express";
import { loginErrorHandler, loginUser } from "../controllers/login.controller";
const router = express.Router();
import { body } from "express-validator";

router.post(
  "/",
  body("email").isEmail(),
  body("password").notEmpty().isString(),
  loginErrorHandler,
  loginUser
);

export { router as loginRouter };
