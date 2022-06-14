const express = require("express");
import { getAllEvents } from "../controllers/event.controller";
const router = express.Router();
const notesController = require("../controllers/notes.controllers");

router.get("/", notesController.getNote);


export { router as notesRouter };
