import express from "express";
const router = express.Router();
import {
  participateEvent,
  validateValidEventBody,
} from "../controllers/eventparticipate.controller";
import { body , param } from "express-validator";

router.post(
  "/:eventid",
  param("eventid").notEmpty().isNumeric(),
  body("userEmail").notEmpty().isString(),
  body("isAssistant").optional().isBoolean(),
  validateValidEventBody,
  participateEvent
);

export { router as eventParticipateRouter };
