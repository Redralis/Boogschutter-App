import express from "express";
import { loginRouter } from "./routes/login.routes";
import { registerRouter } from "./routes/register.routes";
import { memberListRouter } from "./routes/memberlist.routes";
import { eventParticipateRouter } from "./routes/eventParticipate.routes";
import { router } from "./routes/resetPassword.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())
const port = 3000 || process.env.PORT;

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/login/", loginRouter);
app.use("/register/", registerRouter);
app.use("/members/",memberListRouter);
app.use("/participate/",eventParticipateRouter);

app.all("*", (req, res) => {
  res.status(401).json({
    status: 401,
    result: "End-point not found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
