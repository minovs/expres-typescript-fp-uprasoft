import { Request, Response, NextFunction } from 'express'
import { errType } from '../types/types'

export const errorsHandler = (err: errType, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') console.log(err)
  if (err.status) return res.status(err.status).json({ message: err.message })
  return res.status(500).json({ message: 'Непредвиденная ошибка' })
}
