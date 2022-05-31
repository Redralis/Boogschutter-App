
import express from 'express'
import { loginRouter } from './routes/login.routes'
const app = express()
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/login/", loginRouter)

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
