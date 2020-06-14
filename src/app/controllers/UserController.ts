import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import User from '../models/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await getRepository(User).find({
      select: ['id', 'firstName', 'username', 'email', 'phone', 'active'],
      order: {
        firstName: 'ASC'
      }
    })

    return res.json(users)
  }

  public async show (req: Request, res: Response): Promise<Response> {
    const user = await getRepository(User).findOne(req.params.id, {
      select: ['id', 'avatar', 'firstName', 'lastName', 'username', 'email', 'phone', 'dateBorn', 'gender', 'admissionDate', 'position', 'role', 'active'],
      relations: ['avatar']
    })

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

    const { id, username, firstName, email, role } = await getRepository(User).save(user)

    return res.json({ id, username, firstName, email, role })
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

    const { id, firstName } = await getRepository(User).findOne(newUser.id) as User

    return res.json({ id, firstName, email, username })
  }
}

export default new UserController()
