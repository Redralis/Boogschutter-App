const express = require("express");
const { regUser } = require("../controllers/registratie.controller");
const registratieUser = require("..//controllers/registratie.controller");
const router = express.Router();

router.post("/", registratieUser.regUser);

export { router as registerRouter };
