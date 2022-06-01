import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";
const nodemailer = require('nodemailer');

const resetPassword = async (req: any, res: any) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {
        const result = prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                email: true,
                password: true,
                isAdmin: true,
                isTrainer: true,
                isMatchLeader: true
            },
        });

        if (password !== undefined && email !== undefined) {
            console.log("entered query")
            const updateUser = await prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    password: password,
                },
            })

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            })

            res.status(200).json({
                status: 200,
                password: user
            })
        }
    } catch (err) {}

    // return;
};



const sendEmailForReset = async (req: any, res: any) => {
    console.log("Trying to send email.")
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'boogschuttervereniging@gmail.com',
            pass: 'qwerty@123'
        }
    });

    if (req.body.email !== undefined) {
        const mailOptions = {
            from: 'boogschuttervereniging@gmail.com',
            to: req.body.email,
            subject: 'Invoices due',
            text: 'Dudes, we really need your money.'
        };

        transporter.sendMail(mailOptions, function(error: any, info: { response: string; }){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({
            status: 200,
            response: "sent mail, Check your mailbox"
        })
    }
}






export { resetPassword ,sendEmailForReset};
