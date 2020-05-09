import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import authConfig from '../../config/auth'
import { Request, Response, NextFunction } from 'express'

interface TokenDto {
  id: number
  iat: number
  exp: number
}

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, String(authConfig.secret)) as TokenDto

    req.userId = decoded.id

    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
