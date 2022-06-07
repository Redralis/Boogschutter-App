import express from "express";
import { loginRouter } from "./routes/login.routes";
import { registerRouter } from "./routes/register.routes";
import { validateJWTToken } from "./controllers/auth.controller";
import { router } from "./routes/resetPassword.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())
const port = 3000;

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/login/", loginRouter);
app.use("/register/", registerRouter);

app.all("*", (req, res) => {
  res.status(401).json({
    status: 401,
    result: "End-point not found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
