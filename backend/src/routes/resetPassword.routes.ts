import express from "express";
import { resetPassword } from "../controllers/resetPassword.controller";
const router = express.Router();

console.log("Searching through Router")

router.put('/resetPassword', resetPassword);

export { router };
