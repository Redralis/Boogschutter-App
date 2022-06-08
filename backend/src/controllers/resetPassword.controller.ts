import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');



const resetPassword = async (req: any, res: any) => {

    console.log('entered resetPassword')
    console.log(req.body.data , 'body.data zzzzzz')
    const { token, email, password } = req.body.data;
    console.log(token, email, password)

    if (password !== undefined && email !== undefined && token !== undefined) {
        console.log("entered query")
        const user = await prisma.$queryRaw`SELECT * FROM ForgotPassword WHERE ForgotPasswordUserEmail = ${email} AND token = ${token}`
        console.log(user)

        if (user === undefined) {
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
};



const sendEmailForReset = async (req: any, res: any) => {
    console.log("Trying to send email.")
    console.log(req.body)
    let mail = req.body.data
    let token: any;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'boogschuttervereniging@gmail.com',
            pass: 'qfwynoehqpcpllug'
        }
    });
    // qfwynoehqpcpllug

    //Generate a random token thats used to reset password
    require('crypto').randomBytes(20, async function (err: any, buffer: { toString: (arg0: string) => any; }) {
        token = buffer.toString('hex');
        console.log(token, 'token')

        if (req.body.data !== undefined) {
            const mailOptions = {
                from: 'boogschuttervereniging@gmail.com',
                to: req.body.data,
                subject: 'verander je wachtwoord!',
                text: 'kopieer deze code en gebruik deze bij het updaten van je wachtwoord ' +
                    'code:' + token
            };

            const checkMail = await prisma.$queryRaw`SELECT * FROM user WHERE email = ${mail}`

            if (checkMail.length !== 0) {
                const addTokenToUser = await prisma.forgotPassword.create({
                    data: {
                        ForgotPasswordUserEmail: req.body.data,
                        token: token
                    },
                })
                console.log(addTokenToUser, 'added to table')
                res.status(200).json({
                    response: addTokenToUser
                })


                transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
                    if (error) {
                        console.log(error);
                        res.status(400).json({status: 400, response: error})
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.status(200).json(
                            {
                                status: 200,
                                response: info.response
                            })
                    }
                });

            }else {
                res.status(400).json({
                    response: "DID NOT FIND EMAIL"
                })
                console.log("DID NOT FIND EMAIL")
            }




        }


    });





}






export { resetPassword ,sendEmailForReset};
