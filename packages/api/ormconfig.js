const config = require('config')

const dbCredentials = config.get('database.url') ? {
    url: config.get('database.url')
  } : {
    host: config.get('database.host'),
    port: config.get('database.port'),
    username: config.get('database.username'),
    password: config.get('database.password'),
    database: config.get('database.name')
  }

module.exports = {
  type: 'postgres',
  ...dbCredentials,
  synchronize: config.get('database.synchronizeSchema'),
  logging: false,
  entities: [
    `${config.get('build.outDir')}/src/model/entities.${config.get('build.extension')}`
  ],
  migrations: [
    `${config.get('build.outDir')}/migrations/**/*`
  ],
  cli: {
    migrationsDir: 'migrations'
  }
}
