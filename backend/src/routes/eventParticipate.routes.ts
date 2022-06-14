import express from "express";
const router = express.Router();
import {
  checkIfAlreadyEnrolled,
  participateEvent,
  validateValidEventBody,
} from "../controllers/eventparticipate.controller";
import { body, param } from "express-validator";

router.post(
  "/:eventid",
  param("eventid").notEmpty().isNumeric(),
  body("email").notEmpty().isString(),
  validateValidEventBody,
  participateEvent
);

router.get(
  "/isenrolled",
  body("eventid").notEmpty().isNumeric(),
  body("email").notEmpty().isString(),
  validateValidEventBody,
  checkIfAlreadyEnrolled
);

export { router as eventParticipateRouter };
