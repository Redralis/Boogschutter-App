import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { EmitFlags } from "typescript";
const nodemailer = require("nodemailer");

const regUser = async (req: any, res: any, next: any) => {
  const { email, firstName, lastName, bondNumber, isAdmin, isTrainer, isMatchLeader, phoneNumber } = req.body;
  let newPassword = "";

  require("crypto").randomBytes(3, async function (err: any, buffer: { toString: (arg0: string) => any }) {
    newPassword = buffer.toString("hex");
    console.log(newPassword, "token");


    if (email !== undefined) {
      const data = await prisma.user.create({
        data: {
          email: email,
          password: newPassword,
          firstName: firstName,
          lastName: lastName,
          bondNumber: bondNumber,
          isAdmin: isAdmin,
          isTrainer: isTrainer,
          isMatchLeader: isMatchLeader,
          phoneNumber: phoneNumber
        }
      });

      const createNote = await prisma.notes.create({
        data: {
          notesMail: email,
          title: "aantekeningen",
          body: "hallo ik schrijf hier al die leuke dingetjes over mijn handboog waajoowww"
        }
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "boogschuttervereniging@gmail.com",
          pass: "qfwynoehqpcpllug",
        },
      });
      // qfwynoehqpcpllug

      const mailOptions = {
        from: "boogschuttervereniging@gmail.com",
        to: email,
        subject: "U heeft een nieuw account bij de boogschuttersvereniging. yay!",
        text: ` u kan inloggen met uw email, en gebruik het wachtwoord ${newPassword}. Wilt u een ander wachtwoord?
         Klik op "wachtwoord vergeten" bij het inlogscherm`
      };

      transporter.sendMail(
          mailOptions,
          function (error: any, info: { response: string }) {
            if (error) {
              console.log(error);
              res.status(400).json({ status: 400, response: error });
            } else {
              console.log("Email sent: " + info.response);
              res.status(200).json({
                status: 200,
                response: info.response,
              });
            }
          }
      );

      res.status(200).json({
        status: 200,
        newAccount: data
      })
    } else {
      res.status(400).json({
        response: "Be sure to have an email where we can send the data to... dumbass."
      })
    }
      })
};
export { regUser };
