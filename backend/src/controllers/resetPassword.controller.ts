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

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            })
            console.log(user, "user info")
            if (user == undefined) {
                res.status(200).json({
                    status: 400,
                    password: "Can not find this email in the database."
                })
            }else {
                const updateUser = await prisma.user.update({
                    where: {
                        email: email,
                    },
                    data: {
                        password: password,
                    },
                })
                res.status(200).json({
                    status: 200,
                    password: user
                })
            }
        }
    } catch (err) {}

    // return;
};



const sendEmailForReset = async (req: any, res: any) => {
    console.log("Trying to send email.")
    console.log(req.body)
    console.log(req.body.data)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'boogschuttervereniging@gmail.com',
            pass: 'qwerty@123'
        }
    });

    if (req.body.data !== undefined) {
        const mailOptions = {
            from: 'boogschuttervereniging@gmail.com',
            to: req.body.data,
            subject: 'Hold! Hands up!',
            text: 'Dudes, we really need your money.'
        };

        transporter.sendMail(mailOptions, function(error: any, info: { response: string; }){
            if (error) {
                console.log(error);
                res.status(400).json({status:400, response: error})
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json(
                    {
                        status: 200,
                        response: info.response
                    })
            }
        });
    }
}






export { resetPassword ,sendEmailForReset};
