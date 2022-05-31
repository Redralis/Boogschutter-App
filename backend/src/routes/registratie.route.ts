const express = require("express");
const { regUser } = require("../controllers/registratie.controller");
const registratieUser = require("..//controllers/registratie.controller");
const router = express.Router();

router.put("/api/reg", registratieUser.regUser);

export { router };
module.exports = router;
