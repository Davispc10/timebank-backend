import { createConnection, Connection } from 'typeorm'
// import mongoose from 'mongoose'

import databaseConfig from '../config/database'

class Database {
  constructor () {
    this.conectDB()
    // this.mongo()
  }

  private async conectDB (): Promise<Connection> {
    return await createConnection(databaseConfig)
  }

  // private mongo(): void {
  //   this.mongoConnection = mongoose.connect('mongodb://localhost:27017/timebank', {
  //     useNewUrlParser: true
  //   })
  // }
}

export default new Database()
