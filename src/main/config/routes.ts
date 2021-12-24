import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join, resolve } from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  const dirName = resolve(__dirname)
  const path = join(dirName, '../routes')
  readdirSync(path).map(async file => {
    if (!file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
