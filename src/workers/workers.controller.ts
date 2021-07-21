import express from 'express'
const router = express.Router()
import { getAll } from './workers.service'

router.get('/:date', async (req: any, res) => {
  try {
    const { date } = req.params
    const { alfirm, parent_id, id_log } = req.user
    const result = await getAll(alfirm, parent_id, id_log, date)
    return res.status(200).json(result)
  } catch (e) {
    throw e
  }
})

export default router
