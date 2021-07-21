import express from 'express'
import dotenv from 'dotenv'
import routes from './routes'
import { errorsHandler } from './middlevers/errors.handler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use('/api', routes)
app.use(errorsHandler)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
