import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Report from '../models/Report'
import User from '../models/User'
import Balance from '../models/Balance'

class ReportController {
  public async index (req: Request, res: Response): Promise<Response> {
    const reports = await getRepository(Report).find({ relations: ['user'] })

    // const reportsFormatted = reports.map(report => {
    //   return {
    //     id: report.id,
    //     user: report.user.firstName,
    //     timeStart: report.timeStart.getTime(),
    //     timeEnd: report.timeEnd.getTime(),
    //     previousBalance: report.previousBalance,
    //     currentBalance: report.currentBalance,
    //     date: report.timeStart.toDateString()
    //   }
    // })

    return res.json(reports)
  }

  public async show (req: Request, res: Response): Promise<Response> {
    const report = await getRepository(Report).findOne(req.params.id, { relations: ['user'] })

    if (!report) {
      return res.status(400).json({ error: 'Report not found' })
    }

    // const reportFormatted = {
    //   id: report.id,
    //   user: report.user.firstName,
    //   timeStart: report.timeStart.getTime(),
    //   timeEnd: report.timeEnd.getTime(),
    //   previousBalance: report.previousBalance,
    //   currentBalance: report.currentBalance,
    //   date: report.timeStart.toDateString()
    // }

    return res.json()
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { userId, date, timeStart, timeEnd, positive, previousBalance, currentBalance, obs } = req.body

    const user = await getRepository(User).findOne(userId)

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    // 1995-01-31T01:57:00
    const report = new Report(user, timeStart, timeEnd, date, positive, obs, previousBalance, currentBalance)

    await getRepository(Report).save(report)

    let balance = await getRepository(Balance).findOne({ user })

    if (balance) {
      balance.value = currentBalance
    } else {
      balance = new Balance(user, currentBalance)
    }

    await getRepository(Balance).save(balance)

    return res.json(report)
  }
}

export default new ReportController()
