const express = require("express");
import { getEventsDay, getAllEvents } from "../controllers/event.controller";
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.get("/day", eventController.getEventsDay);
router.get("/", eventController.getAllEvents);

export { router as eventRouter };
