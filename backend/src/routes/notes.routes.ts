const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notes.controllers");

router.get("/getNote", notesController.getNote);
router.put("/saveNote", notesController.saveNote)

export { router as notesRouter };
