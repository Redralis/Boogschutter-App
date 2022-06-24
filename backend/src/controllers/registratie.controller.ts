import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt, {hash} from "bcrypt";

const saltRounds = 10;
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {auth} from '../Firebase/firebase'

const nodemailer = require("nodemailer");

const regUser = async (req: any, res: any, next: any) => {
    const {email} = req.body;
    let newPassword = "";

    require("crypto").randomBytes(3, async function (err: any, buffer: { toString: (arg0: string) => any }) {
        newPassword = buffer.toString("hex");
        console.log(newPassword, "Heb je misschien een wietje?");




        if (email !== undefined) {
            const checkMail = await prisma.user.findMany({
                where: {
                    email: email,
                },
            })
            console.log(checkMail.length);
            console.log(checkMail);
            if (checkMail.length === 0) {
                console.log("Twin not found, creating account");
                bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
                    // Store hash in your password DB.
                    console.log(hash)
                    const data = await prisma.user.create({
                        data: {
                            email: email,
                            password: hash,
                            firstName: "Tijdelijke Voornaam",
                            lastName: "Tijdelijke achternaam",
                            isAdmin: false,
                            isTrainer: false,
                            isMatchLeader: false,
                        }
                    });
                    const user = await prisma.notes.create({
                        data: {
                            notesMail: email,
                            title: "useless column",
                            body: "Empty"
                        },
                    })

                });


            } else {
                return res.status(400).json({
                    status: 400,
                    response: "Email already exists is this database."
                })
            }


            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "boogschuttervereniging@gmail.com",
                    pass: process.env.GMAIL_PASS,
                },
            });
            // qfwynoehqpcpllug

            const mailOptions = {
                from: "boogschuttervereniging@gmail.com",
                to: email,
                subject: "U heeft een nieuw account bij de boogschuttersvereniging.",
                text: `U kan inloggen met uw email, en gebruik het wachtwoord ${newPassword}. Wilt u een ander wachtwoord?
         Klik op "wachtwoord vergeten" bij het inlogscherm`
            };



            transporter.sendMail(
                mailOptions,
                function (error: any, info: { response: string }) {
                    if (error) {
                        console.log(error);
                        res.status(400).json({status: 400, response: error});
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
                newAccount: "New account created"
            })
        } else {
            res.status(400).json({
                response: "Be sure to have an email where we can send the data to"
            })
        }
    });
}
export {regUser};
