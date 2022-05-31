import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { EmitFlags } from "typescript";

const regUser = async (req: any, res: any, next: any) => {
  const { email, password } = req.body;
  try {
    var data = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
      },
    });
    if (data == null) {
      res.status(500).json({
        status: 500,
        result: "No data found",
      });
    } else if (data.password == "geheim") {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          password: password,
        },
      });
      res.status(400).json({
        status: 400,
        result: "Wachtwoord gewijzigd",
      });
    } else {
      res.status(408).json({
        status: 408,
        result: "Kies ander password",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 404,
      result: "Failed",
    });
  }
};
export { regUser };
