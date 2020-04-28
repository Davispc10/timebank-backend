import { CreateDateColumn, UpdateDateColumn, Column, Entity, AfterLoad, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class File {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  path: string

  url: string
  @AfterLoad()
  getUrl (): void {
    this.url = `${process.env.APP_URL}/files/${this.path}`
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default File
