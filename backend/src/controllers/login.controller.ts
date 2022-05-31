import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();
const privateKey = process.env.PRIVATEKEY || "geheim";
import { validationResult } from "express-validator";

const loginErrorHandler = async (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
    const errorFieldParam = errors.array()[0].param;
    switch (errorFieldParam) {
      case "email":
        res.status(400).json({ errors: "invalid email" });
        break;
      case "password":
        res.status(400).json({ errors: "password must be provided" });
        break;
    }
  }
  next();
  
};

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
        bcrypt.compare(password, data.password, (err, result) => {
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
                if (err !== null) {
                  res.status(400).json({
                    status: 400,
                    error: "Something went wrong",
                  });
                } else {
                  res.status(200).json({
                    status: 200,
                    token,
                  });
                }
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
    } catch (err) {
      res.status(400).json({
        status: 400,
        error: "Something went wrong",
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      error: "incorrect request body",
    });
  }
};

export { loginErrorHandler, loginUser };
