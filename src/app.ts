import express from 'express'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
