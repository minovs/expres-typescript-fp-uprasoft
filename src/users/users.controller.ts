import express from 'express'
import { customError } from '../service/error.service'
import { auth, refresh } from './users.service'
import { logout } from './users.model'

const router = express.Router()

router.post('/login', async (req, res, next) => {
  const { login, password } = req.body
  if (!login || !password) return next(customError(400, 'Все поля должны быть заполнены!'))
  try {
    const tokens = await auth(login, password)
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(tokens)
  } catch (e) {
    next(e)
  }
})

router.post('/logout', async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    logout(refreshToken)
    res.clearCookie('refreshToken')
    return res.json('exit')
  } catch (e) {
    next(e)
  }
})

router.get('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const tokens = await refresh(refreshToken)
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(tokens)
  } catch (e) {
    next(e)
  }
})

export default router
