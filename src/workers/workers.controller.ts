import express from 'express'
const router = express.Router()
import { getAll } from './workers.service'

router.get('/:date', async (req, res) => {
  const { date } = req.params
  try {
    const result = await getAll(date)
    res.status(200).json(result)
  } catch (e) {
    console.log(e)
  }
})

export default router
