const express = require("express");
import { getEvents, makeEvent } from "../controllers/event.controller";
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.post("/", eventController.makeEvent);
router.get("/", eventController.getEvents);

export { router as eventRouter };
