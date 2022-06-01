import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
require("dotenv").config();

const getMemberList = async (req: any, res: any) => {
 
  if (typeof req.isAdmin !== "undefined" && req.isAdmin) {
    const data = await prisma.user.findMany({
      select: {
        email: true,
        firstName: true,
        lastName: true,
        bondNumber: true,
        phoneNumber: true,
      },
    });
    data.values
    res.status(200).json({ result: data });
  }else {
    const data = await prisma.user.findMany({
      select: {
        email: true,
        firstName: true,
        lastName: true,
      },
    });
    data.values
    res.status(200).json({ result: data });
  }
};

export { getMemberList };
