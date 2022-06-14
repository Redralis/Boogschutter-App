import express from "express";
const router = express.Router();
import {
  checkIfAlreadyEnrolled,
  participateEvent,
  validateValidEventBody,
} from "../controllers/eventparticipate.controller";
import { body, param } from "express-validator";

router.post(
  "/event/:eventid",
  param("eventid").notEmpty().isNumeric(),
  body("email").notEmpty().isString(),
  validateValidEventBody,
  participateEvent
);

router.post(
  "/isenrolled/",
  body("eventid").notEmpty().isNumeric(),
  body("email").notEmpty().isString(),
  validateValidEventBody,
  checkIfAlreadyEnrolled
);

export { router as eventParticipateRouter };
