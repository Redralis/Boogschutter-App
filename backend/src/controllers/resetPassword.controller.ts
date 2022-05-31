import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";

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

export { resetPassword };
