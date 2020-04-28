import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, BeforeInsert } from 'typeorm'
import { MinLength, IsDate, IsEmail, IsString, IsDefined, IsPhoneNumber, IsBoolean, IsOptional, IsEnum } from 'class-validator'
import bcrypt from 'bcryptjs'

import File from './File'
import Report from './Report'

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'O'
}

export enum UserRole {
  MANAGER = 'M',
  EMPLOYEE = 'E'
}

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number

  @IsString()
  @IsDefined()
  @Column()
  name: string

  @IsString()
  @IsDefined()
  @Column()
  username: string

  @IsString()
  @IsDefined()
  @IsEmail()
  @Column()
  email: string

  @Column()
  passwordHash: string

  @IsString()
  @IsDefined()
  @MinLength(6)
  password: string

  @BeforeInsert()
  hashPassword (): void {
    this.passwordHash = bcrypt.hashSync(this.password, 8)
  }

  @IsDate()
  @IsOptional()
  @Column({ nullable: true })
  dateBorn: Date

  @IsDefined()
  @IsEnum(Gender)
  @Column({ type: 'enum', enum: Gender })
  gender: Gender

  @IsDate()
  @IsOptional()
  @Column({ nullable: true })
  admissionDate: Date

  @IsString()
  @IsPhoneNumber('BR')
  @IsOptional()
  @Column({ nullable: true })
  phone: string

  @IsBoolean()
  @IsDefined()
  @Column()
  active: boolean

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  position: string

  @OneToOne(() => File)
  @JoinColumn()
  avatar: File

  @IsEnum(UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYEE
  })
  role: UserRole

  @OneToMany(() => Report, report => report.user)
  reports: Report[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor (name: string, username: string, email: string, password: string, gender: Gender, active: boolean, role: UserRole) {
    this.name = name
    this.username = username
    this.email = email
    this.password = password
    this.gender = gender
    this.active = active
    this.role = role
  }
}

export default User
