import express from "express";
import {loginUser } from "../controllers/login.controller";
const router = express.Router();

router.post("/", loginUser);

export { router };