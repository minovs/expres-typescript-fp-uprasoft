import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import routes from './routes'
import { errorsHandler } from './middlevers/errors.handler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)

app.use(express.json())
app.use(cookieParser())
app.use('/api', routes)
app.use(errorsHandler)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
