import bcrypt from 'bcrypt-nodejs'
import { generateTokens, validateRefreshToken } from '../service/token.service'
import { checkLogin, checkUserInTokenStore, checkTokenInStore, updateToken, saveToken } from './users.model'
import { customError } from '../service/error.service'
import { userType } from '../types/types'

export const auth = async (login: string, password: string) => {
  try {
    const user = await checkLogin(login)
    if (user.length === 0) throw customError(400, `Логин и пароль неверны!`)
    const result = bcrypt.compareSync(password, user[0].password)
    if (!result) throw customError(400, 'Логин и пароль неверны!')
    const tokens = await generateTokens(user[0])
    const tokenInBase = await checkUserInTokenStore(user[0].id)
    if (tokenInBase.length > 0) {
      await updateToken(user[0].id, tokens.refreshToken)
    } else {
      await saveToken(user[0].id, tokens.refreshToken)
    }
    return tokens
  } catch (e) {
    throw e
  }
}

export const refresh = async (refreshToken: string) => {
  if (!refreshToken) throw customError(401, 'Пользователь не авторизован')
  try {
    const userRToken = validateRefreshToken(refreshToken)
    const dbRToken = await checkTokenInStore(refreshToken)
    if (!userRToken || !dbRToken) throw customError(401, 'Пользователь не авторизован')
    const user: userType = JSON.parse(JSON.stringify(userRToken))
    const tokens = await generateTokens(user)
    return tokens
  } catch (e) {
    throw e
  }
}
