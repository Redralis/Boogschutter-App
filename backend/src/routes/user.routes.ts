const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post("/get", userController.getUser);
router.put("/edit", userController.editUser);

export { router as userRouter };
