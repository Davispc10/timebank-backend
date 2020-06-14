import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import authConfig from '../../config/auth'

class SessionController {
  public async store (req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body

    const user = await getRepository(User).findOne({ username })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' })
    }

    const { id, firstName, email, avatar, role } = user

    return res.json({
      user: {
        id, firstName, username, email, role, avatar
      },
      token: jwt.sign({ id }, String(authConfig.secret), {
        expiresIn: authConfig.expiresIn
      })
    })
  }

  public async show (req: Request, res: Response): Promise<Response> {
    const user = await getRepository(User).findOne(req.userId, {
      select: ['id', 'avatar', 'firstName', 'lastName', 'username', 'email', 'phone', 'dateBorn', 'gender', 'admissionDate', 'position', 'role', 'active'],
      relations: ['avatar']
    })

    if (!user) {
      return res.status(400).json({ error: 'User not found!' })
    }

    return res.json(user)
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { email, username, oldPassword } = req.body

    const user = await getRepository(User).findOne(req.userId)

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

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' })
    }

    const newUser = await getRepository(User).merge(user, req.body)

    await getRepository(User).save(newUser)

    const { id, firstName, avatar } = await getRepository(User).findOne(newUser.id, { relations: ['avatar'] }) as User

    return res.json({ id, firstName, email, avatar })
  }
}

export default new SessionController()
