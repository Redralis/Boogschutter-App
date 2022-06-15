const express = require("express");
import { getEventsDay, getAllEvents } from "../controllers/event.controller";
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.get("/day", eventController.getEventsDay);
router.get("/day/:date", eventController.getEventsDay);
router.get("/", eventController.getAllEvents);
router.get("/week/:date", eventController.getWeekEvents);
router.get("/week", eventController.getWeekEvents);

export { router as eventRouter };
