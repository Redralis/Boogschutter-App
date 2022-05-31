
import express from 'express'
import {router} from "./routes/resetPassword.routes";
const app = express()
const port = 3000
app.use(express.json())

app.all("*", (req, res, next) => {
  const method = req.method;
  console.log(`Method ${method} is aangeroepen`, req.url);
  next();
});

app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.all("*", (req, res) => {
  res.status(401).json({
    status: 401,
    result: "End-point not found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

