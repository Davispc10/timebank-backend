import { CreateDateColumn, UpdateDateColumn, Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { IsDefined, IsString } from 'class-validator'

import User from './User'

@Entity()
class Balance {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @IsDefined()
  @IsString()
  @Column('time')
  value: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor (user: User, balance: string) {
    this.user = user
    this.value = balance
  }
}

export default Balance
