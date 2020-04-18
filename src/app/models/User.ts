import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  GHOST = 'ghost'
}

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column()
  email: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GHOST
  })
  role: UserRole

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  constructor (firstName: string, email: string) {
    this.firstName = firstName
    this.email = email
  }
}

export default User
