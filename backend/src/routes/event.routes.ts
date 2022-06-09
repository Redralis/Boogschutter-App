const express = require("express");
import { getEvents } from "../controllers/event.controller";
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.get("/", eventController.getEvents);

export { router as eventRouter };
