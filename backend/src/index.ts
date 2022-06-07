import express from "express";
import { loginRouter } from "./routes/login.routes";
import { registerRouter } from "./routes/register.routes";
import { validateJWTToken } from "./controllers/auth.controller";
import { router } from "./routes/resetPassword.routes";
import { eventRouter } from "./routes/event.routes";
const app = express();
app.use(express.json());
const port = 3000;

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/login/", loginRouter);
app.use("/register/", registerRouter);
app.use("/event/", eventRouter);

app.all("*", (req, res) => {
  res.status(401).json({
    status: 401,
    result: "End-point not found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
