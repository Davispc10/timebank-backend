import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import User from '../models/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await getRepository(User).find()

    return res.json(users)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const userData: User = req.body

    const userExist = await getRepository(User).findOne({
      where: {
        email: userData.email
      }
    })

    if (userExist) {
      return res.status(400).json({ error: 'User already exits' })
    }

    const user = new User(userData.name, userData.username, userData.email, userData.password, userData.gender, userData.active, userData.role)

    const { id, username, name, email, role } = await getRepository(User).save(user)

    return res.json({ id, username, name, email, role })
  }
}

export default new UserController()
