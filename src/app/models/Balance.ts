import { CreateDateColumn, UpdateDateColumn, Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import User from './User'

@Entity()
class Balance {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @Column()
  balance: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Balance
