import jwt from "jsonwebtoken";
require("dotenv").config();
const privateKey = process.env.PRIVATEKEY || "geheim";

const validateJWTToken = async (req: any, res: any, next: any) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json("Unauthorize user");

  try {
    const decoded = jwt.verify(
      token,
      privateKey,
      function (err: any, decode: any) {
        console.log(decode); // bar
      }
    );
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json("Token not valid");
  }
};

export { validateJWTToken };
