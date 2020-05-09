import { Request, Response, NextFunction } from 'express'
import { isDefined, validateOrReject } from 'class-validator'

import User from '../models/User'

export default async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const user = new User(req.body)

    await validateOrReject(user)

    if (user.password || user.oldPassword || user.confirmPassword) {
      if (!isDefined(user.password) || !isDefined(user.oldPassword) || !isDefined(user.confirmPassword)) {
        return res.status(400).json({ error: 'Validation fails', messages: 'oldPassword, password and confirPassword must not be null' })
      }

      if (user.password !== user.confirmPassword) {
        return res.status(400).json({ error: 'Validation fails', messages: 'password and confirmPassword must be equal' })
      }
    }

    return next()
  } catch (err) {
    return res.status(400).json({ error: 'Validation fails', messages: err })
  }
}
