import { Request, Response, NextFunction } from 'express'
import { validateOrReject, isDefined } from 'class-validator'

import User from '../models/User'

export default async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const user = new User(req.body)

    await validateOrReject(user)

    if (!isDefined(user.password)) {
      return res.status(400).json({ error: 'Validation fails', messages: 'Password is required' })
    }

    return next()
  } catch (err) {
    return res.status(400).json({ error: 'Validation fails', messages: err })
  }
}
