import jwt from "jsonwebtoken";
require("dotenv").config();
const privateKey = process.env.PRIVATEKEY || "geheim";



const validateJWTToken = async (req:any, res:any, next:any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
      statusCode: 401,
      message: "Not authorized",
    });
  } else {
    // Strip the word 'Bearer ' from the headervalue
    const token = authHeader.substring(7, authHeader.length);

    jwt.verify(token, privateKey, (err:any, payload:any) => {
      if (err) {
        res.status(401).json({
          error: "Not authorized",
          datetime: new Date().toISOString(),
        });
      }
      if (payload) {
        // User heeft toegang. Voeg UserId uit payload toe aan
        // request, voor ieder volgend endpoint.
        req.email = payload.email;
        req.isAdmin = payload.isAdmin;
        req.isTrainer = payload.isTrainer;
        req.isMatchLeader = payload.isMatchLeader;
        next();
      }
    });
  }
}

export { validateJWTToken };
