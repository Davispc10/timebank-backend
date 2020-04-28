import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import User from './User'

@Entity()
class Report {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.reports)
  user: User

  @Column()
  timeStart: Date

  @Column()
  timeEnd: Date

  @Column()
  previousBalance: number

  @Column()
  currentBalance: number

  @Column()
  obs: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Report
