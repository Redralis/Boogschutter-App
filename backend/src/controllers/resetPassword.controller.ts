import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const nodemailer = require("nodemailer");
import bcrypt, { hash } from "bcrypt";
const saltRounds = 10;

const resetPassword = async (req: any, res: any) => {
  
  
  const { token, email, password } = req.body.data;
  

  if (password !== undefined && email !== undefined && token !== undefined) {
    
    const user = await prisma.forgotPassword.findMany({
      where: {
        ForgotPasswordUserEmail: email,
        token: token
      },
    })
    

    if (user.length === 0) {
      res.status(200).json({
        status: 400,
        password: "Can not find this email in the database.",
        result: user
      });
    } else {
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
          res.status(400).json({
            err,
          });
        }
        const updateUser = await prisma.user.update({
          where: {
            email,
          },
          data: {
            password: hash,
          },
        });



        res.status(200).json({
          status: 200,
          result: user,
        });
      });
    }
  }
};

const sendEmailForReset = async (req: any, res: any) => {
  
  
  let mail = req.body.data;
  let token: any;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "boogschuttervereniging@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });
  // qfwynoehqpcpllug

  //Generate a random token thats used to reset password
  require("crypto").randomBytes(
    3,
    async function (err: any, buffer: { toString: (arg0: string) => any }) {
      token = buffer.toString("hex");
      

      if (req.body.data !== undefined) {
        const mailOptions = {
          from: "boogschuttervereniging@gmail.com",
          to: req.body.data,
          subject: "verander je wachtwoord!",
          text:
            "kopieer deze code en gebruik deze bij het updaten van je wachtwoord " +
            "code: " +
            token,
        };

        const checkMail = await prisma.user.findMany({
          where: {
            email: mail,
          },
        });

        if (checkMail.length !== 0) {
          const addTokenToUser = await prisma.forgotPassword.create({
            data: {
              ForgotPasswordUserEmail: req.body.data,
              token: token,
            },
          });
          
          res.status(200).json({
            response: addTokenToUser,
          });

          transporter.sendMail(
            mailOptions,
            function (error: any, info: { response: string }) {
              if (error) {
                
                res.status(400).json({ status: 400, response: error });
              } else {
                
                res.status(200).json({
                  status: 200,
                  response: info.response,
                });
              }
            }
          );
        } else {
          res.status(400).json({
            response: "DID NOT FIND EMAIL",
          });
          
        }
      }
    }
  );
};

export { resetPassword, sendEmailForReset };
