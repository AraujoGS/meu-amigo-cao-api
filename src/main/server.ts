import 'module-alias/register'
import 'dotenv/config'
import { PostgresHelper, PostgresClient } from '@/infra/db'

const client = PostgresClient(process.env.POSTGRES_URI)
PostgresHelper.connect(client)
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    const port = parseInt(process.env.PORT)
    app.listen(port, () => console.log(`server running at localhost:${port}`))
  })
  .catch(console.error)
