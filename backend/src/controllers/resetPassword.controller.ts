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
        token: token,
      },
    });

    if (user.length === 0) {
      return res.status(200).json({
        status: 400,
        password: "Can not find this email in the database.",
        result: user,
      });
    } else {
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
          return res.status(400).json({
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

        return res.status(200).json({
          status: 200,
          result: user,
        });
      });
    }
  }
};

const sendEmailForReset = async (req: any, res: any) => {
  console.log("Reached route sendmailforreset");
  try {
    console.log("In the try block");
    console.log(process.env.GMAIL_PASS);
    let mail = req.body.email;
    let token: any;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "boogschuttervereniging@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
    });
    // qfwynoehqpcpllug
    try {
      console.log("In the try block number 2");
      require("crypto").randomBytes(
        3,
        async function (err: any, buffer: { toString: (arg0: string) => any }) {
          token = buffer.toString("hex");
          if (err) throw err;

          if (req.body.email !== undefined) {
            const mailOptions = {
              from: "boogschuttervereniging@gmail.com",
              to: req.body.email,
              subject: "Alliance d'Amitié Wachtwoord veranderen",
              text:
                `Kopieer deze code en gebruik hem bij het updaten van je wachtwoord. code: ${token}.`,
            };

            try {
              const checkMail = await prisma.user.findMany({
                where: {
                  email: mail,
                },
              });
              if (checkMail.length !== 0) {
                const addTokenToUser = await prisma.forgotPassword.create({
                  data: {
                    ForgotPasswordUserEmail: req.body.email,
                    token: token,
                  },
                });
                console.log("vlak voor send mail");
                transporter.sendMail(
                  mailOptions,
                  function (error: any, info: { response: string }) {
                    console.log("Reached route send mail");
                    if (error) {
                      return res
                        .status(400)
                        .json({ status: 400, response: error });
                    } else {
                      console.log("successfull");
                      return res.status(200).json({
                        status: 200,
                        response: "email sent",
                      });
                    }
                  }
                );
              } else {
                return res.status(400).json({
                  response: "DID NOT FIND EMAIL",
                });
              }
            } catch (err) {
              console.log(err);
              throw err
            }
          }
        }
      );
    } catch (err) {
      console.log("another try block");
      return res.status(400).json({
        response: "try block 2",
      });
      throw err;
    }
    //Generate a random token thats used to reset password
  } catch (err) {
    console.log("no");
    return res.status(400).json({
      response: "try block",
    });
    throw err;
  }
};

export { resetPassword, sendEmailForReset };