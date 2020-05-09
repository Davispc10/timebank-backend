import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import User from '../models/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await getRepository(User).find({ select: ['id', 'name', 'username', 'email', 'phone', 'active'] })

    return res.json(users)
  }

  public async show (req: Request, res: Response): Promise<Response> {
    const user = await getRepository(User).findOne(req.params.id, { select: ['id', 'avatar', 'name', 'username', 'email', 'phone', 'dateBorn', 'gender', 'admissionDate', 'position', 'role', 'active'], relations: ['avatar'] })

    if (!user) {
      return res.status(400).json({ error: 'User not found!' })
    }

    return res.json(user)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const userData: User = req.body

    let userExist = await getRepository(User).findOne({ email: userData.email })

    if (userExist) {
      return res.status(400).json({ error: 'User email already exits' })
    }

    userExist = await getRepository(User).findOne({ username: userData.username })

    if (userExist) {
      return res.status(400).json({ error: 'Username already exits' })
    }

    const user = new User(userData)

    const { id, username, name, email, role } = await getRepository(User).save(user)

    return res.json({ id, username, name, email, role })
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { email, username, reset } = req.body

    const user = await getRepository(User).findOne(req.params.id)

    if (!user) {
      return res.status(400).json({ error: 'User not found!' })
    }

    if (email !== user.email) {
      const userExits = await getRepository(User).findOne({ email })

      if (userExits) {
        return res.status(400).json({ error: 'User email already exists' })
      }
    }

    if (username !== user.username) {
      const userExits = await getRepository(User).findOne({ username })

      if (userExits) {
        return res.status(400).json({ error: 'Username already exists' })
      }
    }

    const newUser = await getRepository(User).merge(user, req.body)

    if (reset) {
      newUser.password = '123456'
    }

    await getRepository(User).save(newUser)

    const { id, name } = await getRepository(User).findOne(newUser.id) as User

    return res.json({ id, name, email, username })
  }
}

export default new UserController()
