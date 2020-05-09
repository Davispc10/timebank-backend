import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm'
import { MinLength, IsEmail, IsString, IsDefined, IsPhoneNumber, IsBoolean, IsOptional, IsEnum, IsDateString } from 'class-validator'
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

  @IsString()
  @IsOptional()
  @MinLength(6)
  oldPassword: string

  @IsString()
  @IsOptional()
  @MinLength(6)
  @Column()
  password: string

  @IsString()
  @IsOptional()
  @MinLength(6)
  confirmPassword: string

  @IsDateString()
  @IsOptional()
  @Column({ nullable: true })
  dateBorn: Date

  @IsDefined()
  @IsEnum(Gender)
  @Column({ type: 'enum', enum: Gender })
  gender: Gender

  @IsDateString()
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

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword (): void {
    this.password = bcrypt.hashSync(this.password, 8)
  }

  checkPassword (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }

  constructor (user: User) {
    Object.assign(this, user)
  }
}

export default User
