import express from "express";
import { getMemberList } from "../controllers/memberlist.controller";
const router = express.Router();
import { body } from "express-validator";
import { validateJWTToken } from "../controllers/auth.controller"

router.get("/", validateJWTToken, getMemberList);

export { router as memberListRouter };
