import '../bootstrap'
import { ConnectionOptions } from 'typeorm'

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  entities: ['src/app/models/*.ts'],
  // migrationsTableName: 'Migracao',
  // cli: { migrationsDir: 'src/database/migrations/' },
  // migrations: ['src/database/migrations/*.ts'],
  logging: true,
  synchronize: true
}

export default config
