import jwt from 'jsonwebtoken'
import { userType } from '../types/types'

export const generateTokens = async (user: userType) => {
  const { id, alfirm, parent_id, id_log, roles } = user
  const accessToken = jwt.sign({ id, alfirm, parent_id, id_log, roles }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '1h',
  })
  const refreshToken = jwt.sign({ id, alfirm, parent_id, id_log, roles }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '1h',
  })
  return {
    accessToken,
    refreshToken,
  }
}

export const validateAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
  } catch (e) {
    return null
  }
}

export const validateRefreshToken = (token: string) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    return userData
  } catch (e) {
    return null
  }
}
