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
  body("email").notEmpty().isString(),
  validateValidEventBody,
  participateEvent
);

export { router as eventParticipateRouter };
