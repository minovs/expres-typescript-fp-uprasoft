import express from 'express'
import { getOne } from './reports.service'

const router = express.Router()

router.get('/:date/:id', async (req: any, res) => {
  const { date, id } = req.params
  const { alfirm } = req.user
  try {
    const result = await getOne(alfirm, date, id)
    return res.status(200).json(result)
  } catch (e) {
    throw e
  }
})
export default router
