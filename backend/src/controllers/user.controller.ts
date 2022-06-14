import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { EmitFlags } from "typescript";

const editUser = async (req: any, res: any, next: any) => {
  const { email, isTrainer, isAdmin, isMatchLeader } = req.body;
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
    }
    if (typeof isTrainer !== 'undefined') {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          isTrainer: isTrainer,
        },
      });
    }
    if (typeof isAdmin !== 'undefined') {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          isAdmin: isAdmin,
        },
      });
    }
    if (typeof isMatchLeader !== 'undefined') {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          isMatchLeader: isMatchLeader,
        },
      });
    }
    res.status(200).json({
      status: 200,
      result: "Gebruiker aangepast",
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      result: "Failed",
    });
  }
};

export { editUser }