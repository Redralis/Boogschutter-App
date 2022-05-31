import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
require("dotenv").config();
const privateKey = process.env.PRIVATEKEY || "geheim";

const loginUser = async (req: any, res: any) => {
  if (req.body !== null) {
    const { email, password } = req.body;
    // if the request contains required body data store them as variables

    try {
      const data = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          email: true,
          password: true,
          isAdmin: true,
          isTrainer: true,
          isMatchLeader: true,
        },
      });
      // find a unique user that has the required email

      if (data !== null) {
        bcrypt.compare(password, data.password, function (err, result) {
          if (err) throw err;

          if (!result) {
            res.status(400).json({
              status: 400,
              error: "password incorrect",
            });
          } else {
            const { email, isAdmin, isTrainer, isMatchLeader } = data;
            jwt.sign(
              { email, isAdmin, isTrainer, isMatchLeader },
              privateKey,
              (err: any, token: any) => {
                // sign a token if the password is correct
                if (err !== null){
                  res.status(400).json({
                    status: 400,
                    error: "Something went wrong",
                  })
                }else {
                  res.status(200).json({
                    status: 200,
                    token,
                  });
                }
                console.log(err);
                console.log(token);
              }
            );
          }
        });
        // if the user exists compare the hashed password with the password the user provided
      } else {
        res.status(400).json({
          status: 400,
          error: "email not found",
        });
      }
    } catch (err) {}
  } else {
    res.status(400).json({
      status: 400,
      error: "incorrect request body",
    });
  }
};

export { loginUser };
