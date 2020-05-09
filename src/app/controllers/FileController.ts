import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import File from '../models/File'
import User from '../models/User'

class FileController {
  public async store (req: Request, res: Response): Promise<Response> {
    const { originalname: name, filename: path } = req.file

    const file = await getRepository(File).save({ name, path })

    const user = await getRepository(User).findOne(req.userId)

    if (!user) {
      return res.status(400).json({ error: 'User not found!' })
    }

    user.avatar = file
    await getRepository(User).save(user)

    return res.json(file)
  }
}

export default new FileController()
