import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Balance from '../models/Balance'
import User from '../models/User'

class BalanceController {
  public async show (req: Request, res: Response): Promise<Response> {
    const user = await getRepository(User).findOne(req.params.userId)

    // const oi = new EmailService()
    // oi.sendMail()

    if (!user) {
      res.status(400).json({ error: 'user not found ' })
    }

    const balance = await getRepository(Balance).findOne({ user })

    return res.json(balance)
  }
}

export default new BalanceController()
