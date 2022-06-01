import express from "express";
import { resetPassword , sendEmailForReset } from "../controllers/resetPassword.controller";
const router = express.Router();

console.log("Searching through Router")


router.get('/sendMailReset', sendEmailForReset);
router.put('/resetPassword', resetPassword);


export { router };
