import express from 'express'
const router = express.Router()
import { getOne } from './reports.service'

router.get('/:date/:id', async (req, res) => {
  const { date, id } = req.params
  try {
    const result = await getOne(date, id)
    res.json(result)
  } catch (e) {
    console.log(e)
  }
})
export default router
