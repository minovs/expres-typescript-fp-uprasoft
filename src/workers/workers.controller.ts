import express from 'express'
const router = express.Router()
import { getAll } from './workers.service'

router.get('/:date', async (req, res) => {
  const { date } = req.params
  res.status(200).json(await getAll(date))
})
// router.get('/:date/:id', async (req, res) => {
//   const { date, id } = req.params
//   res.json(await getOne(date, id))
// })
export default router
