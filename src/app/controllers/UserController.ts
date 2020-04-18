import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import User, { UserRole } from '../models/User'

interface CreateUserDTO {
  firstName: string
  lastname?: string
  email: string
  role: UserRole
}

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await getRepository(User).find()

    return res.json(users)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const userData: CreateUserDTO = req.body

    const user = await getRepository(User).save(userData)

    return res.json(user)
  }
}

export default new UserController()
