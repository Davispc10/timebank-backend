import { Request, Response, NextFunction } from 'express'
import { isDefined, isString, IsDefined } from 'class-validator'

export default async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const { username, password } = req.body

    if (!isDefined(username) && !isString(username)) {
      return res.status(400).json({ error: 'Validation fails', messages: 'Username must to be valid' })
    }

    if (password) {
      if (!IsDefined(password) && !isString(password)) {
        return res.status(400).json({ error: 'Validation fails', messages: 'Password must to be valid' })
      }
    } else {
      return res.status(400).json({ error: 'Validation fails', messages: 'Password must to be valid' })
    }

    return next()
  } catch (err) {
    return res.status(400).json({ error: 'Validation fails', messages: err })
  }
}
