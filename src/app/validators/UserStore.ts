import { Request, Response, NextFunction } from 'express'
import { validateOrReject } from 'class-validator'

import User from '../models/User'

export default async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const userData: User = req.body

    const user = new User(userData.name, userData.username, userData.email, userData.password, userData.gender, userData.active, userData.role)

    await validateOrReject(user)

    return next()
  } catch (err) {
    return res.status(400).json({ error: 'Validation fails', messages: err })
  }
}
