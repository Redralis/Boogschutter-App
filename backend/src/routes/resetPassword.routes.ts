import express from "express";
import { resetPassword , sendEmailForReset } from "../controllers/resetPassword.controller";
const router = express.Router();

router.post('/sendMailReset', sendEmailForReset);
router.put('/resetPassword', resetPassword);


export { router };
