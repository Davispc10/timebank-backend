import { Request, Response, NextFunction } from 'express'
import { validateOrReject } from 'class-validator'
import { getRepository } from 'typeorm'

import Report from '../models/Report'
import User from '../models/User'

export default async (req:Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { userId, date, timeStart, timeEnd, positive, previousBalance, currentBalance, obs } = req.body

    const user = await getRepository(User).findOne(userId)

    if (!user) {
      return res.status(400).json({ error: 'Validation fails', message: 'User not found' })
    }

    const report = new Report(user, timeStart, timeEnd, date, positive, obs, previousBalance, currentBalance)

    await validateOrReject(report)

    return next()
  } catch (err) {
    return res.status(400).json({ error: 'Validation fails', message: err })
  }
}
