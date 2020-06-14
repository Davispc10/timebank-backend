import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { IsString, IsDefined, IsBoolean, IsOptional } from 'class-validator'

import User from './User'

@Entity()
class Report {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.reports)
  user: User

  @IsDefined()
  @IsBoolean()
  @Column()
  positive: boolean

  @IsString()
  @IsDefined()
  @Column()
  date: Date

  @IsString()
  @IsDefined()
  @Column('time')
  timeStart: string

  @IsString()
  @IsDefined()
  @Column('time')
  timeEnd: string

  @IsDefined()
  @IsString()
  @Column('time')
  previousBalance: string

  @IsDefined()
  @IsString()
  @Column('time')
  currentBalance: string

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  obs: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor (user: User, timeStart: string, timeEnd: string, date: Date, positive: boolean, obs: string, previousBalance: string, currentBalance: string) {
    this.user = user
    this.timeStart = timeStart
    this.timeEnd = timeEnd
    this.date = date
    this.positive = positive
    this.obs = obs
    this.previousBalance = previousBalance
    this.currentBalance = currentBalance
  }
}

export default Report
