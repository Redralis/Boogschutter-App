import express from "express";
import { loginRouter } from "./routes/login.routes";
import { memberListRouter } from "./routes/memberlist.routes";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/login/", loginRouter);

app.use("/members/", memberListRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
