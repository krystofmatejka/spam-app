const config = require('config')

module.exports = {
  type: 'mysql',
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.username'),
  password: config.get('database.password'),
  database: config.get('database.name'),
  synchronize: config.get('database.synchronizeSchema'),
  logging: false,
  entities: [
    `./src/model/entities.ts`
  ],
  migrations: [
    `./migrations/**/*`
  ],
  cli: {
    migrationsDir: 'migrations'
  }
}
