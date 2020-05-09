import { CreateDateColumn, UpdateDateColumn, Column, Entity, AfterLoad, PrimaryGeneratedColumn } from 'typeorm'
import { IsDefined, IsOptional, IsString } from 'class-validator'

@Entity()
class File {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsString()
  @IsDefined()
  name: string

  @IsString()
  @IsDefined()
  @Column()
  path: string

  @IsOptional()
  url: string

  @AfterLoad()
  getUrl (): void {
    this.url = `${process.env.APP_URL}/files/${this.path}`
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor (file: File) {
    Object.assign(this, file)
  }
}

export default File
