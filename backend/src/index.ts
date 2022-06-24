import express from "express";
import { loginRouter } from "./routes/login.routes";
import { registerRouter } from "./routes/register.routes";
import { memberListRouter } from "./routes/memberlist.routes";
import { eventParticipateRouter } from "./routes/eventParticipate.routes";
import { router } from "./routes/resetPassword.routes";
import { eventRouter } from "./routes/event.routes";
import { notesRouter } from "./routes/notes.routes";
import { userRouter } from "./routes/user.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const port = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);
app.use("/login/", loginRouter);
app.use("/register/", registerRouter);
app.use("/members/", memberListRouter);
app.use("/participate/", eventParticipateRouter);
app.use("/event/", eventRouter);
app.use("/api/", notesRouter);
app.use("/user/", userRouter);

app.all("*", (req, res) => {
  res.status(401).json({
    status: 401,
    result: "End-point not found",
  });
});

app.listen(port, () => {
  
});
