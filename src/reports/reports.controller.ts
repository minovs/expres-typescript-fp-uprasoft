import express from 'express'
const router = express.Router()
import { getOne } from './reports.service'

router.get('/:date/:id', async (req, res) => {
  const { date, id } = req.params
  res.json(await getOne(date, id))
})
export default router
