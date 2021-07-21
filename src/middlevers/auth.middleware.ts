import { Response, NextFunction } from 'express'
import { customError } from '../service/error.service'
import { validateAccessToken } from '../service/token.service'

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) return next(customError(401, 'Пользователь не авторизован!'))

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) return next(customError(401, 'Пользователь не авторизован!'))

    const user = validateAccessToken(accessToken)
    if (!user) return next(customError(401, 'Пользователь не авторизован!'))

    req.user = user
    next()
  } catch (e) {
    return next(customError(401, 'Пользователь не авторизован!'))
  }
}
