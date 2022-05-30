import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
const saltRounds = 10;

const loginUser = async (req: any, res: any) => {
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

    bcrypt.compare(password, "", function (err, result) {
      // result == true
    });
  } catch (err) {}

  // return;
};

export { loginUser };
