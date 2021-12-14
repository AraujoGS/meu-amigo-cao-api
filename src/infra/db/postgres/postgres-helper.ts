import { DriverDb, TransactionDb } from '@/infra/db/interfaces'
import { Pool } from 'pg'

export class PostgresHelper implements DriverDb, TransactionDb {
  protected client = null

  async connect (uri?: string): Promise<void> {
    this.client = new Pool({ connectionString: uri })
  }

  async disconnect (): Promise<void> {
    this.client.end()
    this.client = null
  }

  async execute (sql: string, params: any[] = []): Promise<any> {
    return this.client.query(sql, params)
  }

  async beginTransaction (): Promise<void> {
    return this.client.query('BEGIN')
  }

  async commitTransaction (): Promise<void> {
    return this.client.query('COMMIT')
  }

  async rollbackTransaction (): Promise<void> {
    return this.client.query('ROLLBACK')
  }
}
